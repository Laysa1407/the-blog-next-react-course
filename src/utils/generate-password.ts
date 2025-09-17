import { hashPassword } from "@/lib/login/manage-login";

(async () => {
    const senha = "123";
    const hashDaSenhaBase64 = await hashPassword(senha);
    console.log(hashDaSenhaBase64);
})();
