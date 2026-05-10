const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const TEAMS = [
  { name: "Argélia" },
  { name: "Argentina" },
  { name: "Austrália" },
  { name: "Áustria" },
  { name: "Bélgica" },
  { name: "Bósnia e Herzegovina" },
  { name: "Brasil" },
  { name: "Canadá" },
  { name: "Cabo Verde" },
  { name: "Colômbia" },
  { name: "República Democrática do Congo" },
  { name: "Croácia" },
  { name: "Curaçao" },
  { name: "República Tcheca" },
  { name: "Equador" },
  { name: "Egito" },
  { name: "Inglaterra" },
  { name: "França" },
  { name: "Alemanha" },
  { name: "Gana" },
  { name: "Haiti" },
  { name: "Irã" },
  { name: "Iraque" },
  { name: "Costa do Marfim" },
  { name: "Japão" },
  { name: "Jordânia" },
  { name: "México" },
  { name: "Marrocos" },
  { name: "Holanda" },
  { name: "Nova Zelândia" },
  { name: "Noruega" },
  { name: "Panamá" },
  { name: "Paraguai" },
  { name: "Portugal" },
  { name: "Qatar" },
  { name: "Arábia Saudita" },
  { name: "Escócia" },
  { name: "Senegal" },
  { name: "África do Sul" },
  { name: "Coreia do Sul" },
  { name: "Espanha" },
  { name: "Suécia" },
  { name: "Suíça" },
  { name: "Tunísia" },
  { name: "Turquia" },
  { name: "Uruguai" },
  { name: "Estados Unidos" },
  { name: "Uzbequistão" },
];

const STICKERS_PER_TEAM = 20;

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validações
    if (!username || username.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Nome deve ter pelo menos 3 caracteres',
      });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido',
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Senha deve ter pelo menos 6 caracteres',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'As senhas não coincidem',
      });
    }

    // Verifica se usuário já existe
    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Usuário ou email já existe',
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inicializa com todas as figurinhas como faltando
    const initialData = {};
    TEAMS.forEach(team => {
      initialData[team.name] = Array.from(
        { length: STICKERS_PER_TEAM },
        (_, i) => i + 1
      );
    });

    // Cria usuário
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      data: initialData,
    });

    const token = generateToken(user._id, user.username);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        data: user.data,
        darkMode: user.darkMode,
      },
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuário e senha são obrigatórios',
      });
    }

    // Busca usuário (inclui senha)
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // Verifica senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Senha incorreta',
      });
    }

    const token = generateToken(user._id, user.username);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        data: user.data,
        darkMode: user.darkMode,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login',
    });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { data, darkMode } = req.body;
    const userId = req.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        data,
        darkMode,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        data: user.data,
        darkMode: user.darkMode,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar dados',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        data: user.data,
        darkMode: user.darkMode,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuário',
    });
  }
};
