import { Injectable, NotFoundException } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailsService {
  checkEmail({ email }) {
    const check =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (check.test(email) === true) {
      return true;
    } else throw new NotFoundException("이메일 형식이 올바르지 않습니다.");
  }

  createToken() {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    return token;
  }

  getAuthNumberTemplate({ token }) {
    const tokenTemplate = `
    <html>
        <body>
            <h1>Rungether 인증번호</h1>
            <hr />
            <div>요청하신 인증번호는 ${token} 입니다.</div>
        </body>
    </html>    
    `;
    return tokenTemplate;
  }

  async sendTemplateToEmail({ email, authTempleate }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter
      .sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "[Rungether] 요청하신 인증번호 6자리를 입력 해 주세요.",
        html: authTempleate,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
  }
}
