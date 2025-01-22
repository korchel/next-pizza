import { FC } from "react";

interface Props {
  code: string;
}

export const VerificationTemplate: FC<Props> = ({ code }) => (
  <div>
    <p>Код подтверждения: {code}</p>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Подтвердить регистрацию
      </a>
    </p>
  </div>
);
