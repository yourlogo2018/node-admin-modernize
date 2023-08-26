import Model from './Model.js';

class User extends Model{
  
    static async createUser(data) {
        try {
            return super.create('users', data);
        } catch (err) {
            throw new Error('Error ao criar usuario.');
        }
    }
    
    static async getUsers() {
       try {
            return super.select('users');
       } catch (err) {
        throw new Error('Nenhum usuario encontrado.');
       }
    }

    static async getUser(id) {
        try {
            return super.select_id('users', id);
        } catch (err) {
            throw new Error('Nenhum usuario encontrado.');
        }
    }

    static async updateUser(id, data) {
        try {
            return super.update('users', id, data);
        } catch (err) {
            throw new Error('Erro ao atualizar usuario.');
        }
    }

    static async deleteUser(id) {
        try {
            return super.delete('users', id);
        } catch (err) {
            throw new Error('Erro ao deletar usuario.');
        }
    }
}

export default User;