// import { FC } from "react";

// interface Props {
//   code: string;
// }

// export const VerificationTemplate: FC<Props> = ({ code }) => (
//   <div>
//     <a href={`${process.env.URL}/api/auth/verify?code=${code}`}>
//       Подтвердить регистрацию
//     </a>
//   </div>
// );

export const VerificationTemplate = (code: string) => {
  return `
    <a href=${process.env.URL}/api/auth/verify?code=${code}>
      Подтвердить регистрацию
    </a>
  `;
};
