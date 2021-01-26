const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Неверный формат почты').isEmail(),
    check('password', 'Неверный формат пароля (минимум 6 символов)')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Проверьте введенные данные'
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Пользователь уже зарегистрирован' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Что-то сломалось...' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Введите существующую почту').normalizeEmail().isEmail(),
    check('password', 'Введите корректный пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Проверьте введенные данные'
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expireIn: '1h' }
      );

      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: 'Что-то сломалось' });
    }
  }
);

module.exports = router;