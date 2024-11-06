>> Middleware autenticação (Exemplo real de funcionamento JWT)

-- authMiddleware.ts
export const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
          -- Carrega infos do usuário
          req.user = await User.findById(decoded.id).select("-password");
    
          if (decoded.id == req.params.id) {
            next();
          } else {
            res.status(401).json("Não autorizado, Token inválido");
          }
        } catch (error) {
          res.status(401).json("Não autorizado, token inexistente");
        }
      }
};

-- Rota protegida
router.get('/', authenticate, getAllUsers);

-- Rota não protegida
router.get('/', getAllUsers);


