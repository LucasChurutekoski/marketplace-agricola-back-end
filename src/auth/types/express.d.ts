import { TipoUsuarioEnum } from '../../users/enums/TipoUsuarioEnum.js';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      tipoUsuario: TipoUsuarioEnum;
    }
  }
}

export {};