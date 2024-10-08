const Locais = require('../models/models.locais');
const { default: axios } = require('axios')


class locaisController {

    async cadastrarCEP(req, res) {
        try {
            const info = req.params.info; 
            const userId = req.user.sub;
    
            const apiKey = '11aead7a975e45179c8ca04bb28a674e';
            const country = 'Brazil';
            
            let dadosEnderecoCep = null;
    
            
            const resultadoCep = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: {
                    q: `${info},${country}`, 
                    key: apiKey,
                    limit: 1,
                    language: 'pt',
                    countrycode: 'br' 
                }
            });
    
            
            if (resultadoCep.data.results.length > 0) {
                dadosEnderecoCep = resultadoCep.data.results[0];
            }
    
            
            if (!dadosEnderecoCep) {
                return res.status(404).json({ error: 'Local não encontrado' });
            }
    
            
            const nomeLocal = req.body.nomeLocal|| 
                "Nome desconhecido";

            const descricao = req.body.descricao || "Descrição desconhecida";
            const latitude = dadosEnderecoCep.geometry ? dadosEnderecoCep.geometry.lat : dadosEnderecoCep.lat;
            const longitude = dadosEnderecoCep.geometry ? dadosEnderecoCep.geometry.lng : dadosEnderecoCep.lon;

            const logradouro = dadosEnderecoCep.components.road || dadosEnderecoCep.formatted || dadosEnderecoCep.components.region || "Logradouro desconhecido";
            const cidade = dadosEnderecoCep.components.city || 
            "Cidade desconhecida";
            const estado = dadosEnderecoCep.components.state && dadosEnderecoCep.components.state_code|| "Estado desconhecido";
            
            
            let cepLocal;
            if (dadosEnderecoCep.components.postcode) {
                cepLocal = dadosEnderecoCep.components.postcode;
            } else {
                const cepJson = descricao.split(', ');
                cepLocal = cepJson[cepJson.length - 2] || "CEP desconhecido";
            }
    
            
            const salvarLocal = await Locais.create({
                nome_local: nomeLocal,
                descricao_local: descricao,
                cep_local: cepLocal,
                latitude_local: latitude,
                longitude_local: longitude,
                logradouro_local: logradouro,
                cidade_local: cidade,
                estado_local: estado,
                id_usuario: userId
            });
    
            res.status(200).json({ message: 'Local cadastrado com sucesso', local: salvarLocal });
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            res.status(500).send({ error: 'Erro ao processar a solicitação' });
        }
    };
    
    async cadastrarLatLong(req, res) {
        try {
            const lat = req.params.lat;
            const long = req.params.long;
            const userId = req.user.sub;
    
            const apiKey = '11aead7a975e45179c8ca04bb28a674e';
            const country = 'Brazil';
    
            let dadosEnderecoCep = null;
    
        
            const resultadoCep = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=11aead7a975e45179c8ca04bb28a674e`, {
                params: {
                    q: `${country}`,
                    key: apiKey,
                    limit: 1,
                    language: 'pt',
                    countrycode: 'br'
                }
            });
    
            
            if (resultadoCep.data.results.length > 0) {
                dadosEnderecoCep = resultadoCep.data.results[0];
            }
    
            
            if (!dadosEnderecoCep) {
                return res.status(404).json({ error: 'Local não encontrado' });
            }
    
            
            const nomeLocal = req.body.nomeLocal|| 
            "Nome desconhecido";
    
            const descricao = req.body.descricao || "Descrição desconhecida";
            const latitude = dadosEnderecoCep.geometry ? dadosEnderecoCep.geometry.lat : dadosEnderecoCep.lat;
            const longitude = dadosEnderecoCep.geometry ? dadosEnderecoCep.geometry.lng : dadosEnderecoCep.lon;

            const logradouro = dadosEnderecoCep.components.road || dadosEnderecoCep.formatted || dadosEnderecoCep.components.region || "Logradouro desconhecido";
            const cidade = dadosEnderecoCep.components.city || 
            "Cidade desconhecida";
            const estado = dadosEnderecoCep.components.state && dadosEnderecoCep.components.state_code|| "Estado desconhecido";
    
            
            let cepLocal;
            if (dadosEnderecoCep.components.postcode) {
                cepLocal = dadosEnderecoCep.components.postcode;
            } else {
                const cepJson = descricao.split(', ');
                cepLocal = cepJson[cepJson.length - 2] || "CEP desconhecido";
            }
    
            
            const salvarLocal = await Locais.create({
                nome_local: nomeLocal,
                descricao_local: descricao,
                cep_local: cepLocal,
                latitude_local: latitude,
                longitude_local: longitude,
                logradouro_local: logradouro,
                cidade_local: cidade,
                estado_local: estado,
                id_usuario: userId
            });
    
            
            res.status(200).json({ message: 'Local cadastrado com sucesso', local: salvarLocal });
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            res.status(500).send({ error: 'Erro ao processar a solicitação' });
        }
    };
    async consultar(req, res) {

        try {
            const userId = req.user.sub;
            const locaisUsuario = await Locais.findAll({
                where: {
                    id_usuario: userId
                }
            });
    
            if (locaisUsuario.length > 0) {
                res.json(locaisUsuario);
            } else {
                res.status(404).json({ error: 'Nenhum local encontrado para o usuário' });
            }
        } catch (error) {
            console.error('Erro ao consultar locais do usuário:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
    };
       
    async consultarUm(req, res) {
        const userId = req.user.sub;
        const local_id = req.params.local_id;

    try {
        const localUsuario = await Locais.findOne({
            where: {
                id_local: local_id,
                id_usuario: userId
            }
        });

        if (!localUsuario) {
            return res.status(404).json({ message: `Não há local com o ID ${local_id} cadastrado para este usuário!` });
        }

        res.json(localUsuario);
    } catch (error) {
        console.error('Erro ao consultar locais do usuário:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
    };

    async deletar(req, res) {

        try {
            const userId = req.user.sub;
            const localId = req.params.local_id;
    
            const localUsuario = await Locais.findOne({
                where: {
                    id_local: localId,
                    id_usuario: userId
                }
            });
    
            if (!localUsuario) {
                return res.status(404).json({ message: `Não há local com o ID ${localId} cadastrado para este usuário!` });
            }
    
            await Locais.destroy({
                where: {
                    id_local: localId,
                    id_usuario: userId
                }
            });
            
            if (localUsuario) {
                return res.status(204).json({ message: `Local com o ID ${localId} removido com sucesso!` });
            }
    
           
           
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                error: 'Não foi possível deletar o local específico',
                detalhes: error.message
            });
        }
    };

    async alterar(req, res) {

        try {
            const userId = req.user.sub;
            const localId = req.params.local_id;
    
            const localUsuario = await Locais.findOne({
                where: {
                    id_local: localId,
                    id_usuario: userId
                }
            });
    
            if (!localUsuario) {
                return res.status(404).json({ message: `Não há local com o ID ${localId} cadastrado para este usuário!` });
            }
    
            await localUsuario.update(req.body);
    
            res.json(localUsuario);
           
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                error: 'Não foi possível editar o local específico',
                detalhes: error.message
            });
        }
    };
}

module.exports = new locaisController