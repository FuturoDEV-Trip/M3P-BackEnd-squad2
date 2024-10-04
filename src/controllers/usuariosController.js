const Usuarios = require("../models/models.usuarios")
const bcrypt = require('bcrypt')
class UsuariosController {

    async cadastrar(req, res) {
        
        try {
            const nome = req.body.nome
            const email = req.body.email
            const password = req.body.password
            const data_nascimento = req.body.data_nascimento
            const cpf = req.body.cpf
            const sexo = req.body.sexo
            const criptografarPassword = await bcrypt.hash(password, 10)
        
        
            if (!nome) {
                return res.status(400).json({ message: 'O preenchimento do nome é obrigatório' })
            }
        
            if (!email) {
                return res.status(400).json({ message: 'O preenchimento do e-mail é obrigatório' })
            }
        
            if (!password) {
                return res.status(400).json({ message: 'O preenchimento da senha é obrigatória' })
            }
            if (!cpf) {
                return res.status(400).json({ message: 'O preenchimento do cpf é obrigatório' })
            }
            if (!sexo) {
                return res.status(400).json({ message: 'O preenchimento do sexo é obrigatório' })
            }
        
            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
            }
        
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
            }
        
            const usuarios = await Usuarios.create({
                email: email,
                password: criptografarPassword,
                nome: nome,
                data_nascimento: data_nascimento,
                cpf: cpf,
                sexo: sexo
        
            })
        
            res.status(201).json(usuarios)
        
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error,
                message: 'Não possível cadastrar o usuário' })
        }
    };

    async consultar(req, res) {

        const usuarios = await Usuarios.findAll()
        if (usuarios.length > 0) {
            res.json(usuarios);
        } else {
            res.status(404).json({ error: 'Nenhum usuário cadastrado.' });
        }

    };

    async deletar(req, res) {

        try {

            const { id } = req.params
    
            const usuario = await Usuarios.findOne({where:{id}})
    
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }
    
            await usuario.destroy()
            return res.status(200).json({message:"Usuário excluido com sucesso!"})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Erro ao excluir usuário',
                error: error
            })
        }
    };

    async alterar(req, res) {
        try {
            const { id } = req.params
            const { email, password } = req.body
    
            let usuario = await Usuarios.findOne({ where: { id:id, usuario_id: req.usuario_id } })
    
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado ou não pertence ao usuário autenticado' })
            }
    
            usuario = await usuario.update({email, password})
    
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar o Usuário' })
        }
    };
}

module.exports = new UsuariosController()