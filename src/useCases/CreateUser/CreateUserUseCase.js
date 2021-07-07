const MailtrapMailProvider = require("../../providers/MailTrapMailProvider");
const UsersRepository = require("../../repositories/UsersRepository");

class CreateUserUseCase {
  async execute(data) {
    const usersRepository = new UsersRepository();
    const userAlreadyExists = await usersRepository.findByEmail(data["email"]);

    if (userAlreadyExists) throw new Error("User already exists");

    const user = usersRepository.save(data);

    const mailtrapProvider = new MailtrapMailProvider();
    await mailtrapProvider.sendMail({
      to: { name: data["name"], email: data["email"] },
      from: {
        name: "Equipe do Meu App",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<p>Você já pode fazer login</p>",
    });

    return user;
  }
}

module.exports = CreateUserUseCase;
