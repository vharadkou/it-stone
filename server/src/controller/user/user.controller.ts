import { controller, httpPost, httpGet, httpPut, response, request, queryParam, httpDelete, } from "inversify-express-utils";
import { inject } from 'inversify';
import * as express from 'express';
import { UserRepository } from "service/user";
import { User } from 'models';

@controller('/api')
export class UserController {
    public  constructor (
        @inject(UserRepository) private userRepository: UserRepository
    ) { }

    @httpGet('/clean-users-database/')
    private async cleanUsersCollection(
        @request() request: express.Request,
        @response() response: express.Response
    ): Promise<boolean | express.Response>{
        try {       
            return this.userRepository.cleanUsersCollection();
        } catch (error) {
            return response.json(error);
        }
    }

    @httpGet('/get-user/')
    private async getUserByUserToken(
        @queryParam('token') request: string,
        @response() response: express.Response
    ): Promise<User | express.Response> {
        try {
            return this.userRepository.getUserByToken(request);
        } catch (error) {
            return response.json(error);
        }
    }

    @httpGet('/get-users/')
    private async getUsers(
        @request() request: express.Request,
        @response() response: express.Response
    ): Promise<User[] | express.Response> {
        try {
            return this.userRepository.getAllUsers();
        } catch (error) {
            return response.json(error);
        }
    }

    @httpPut('/update-user/')
    private async updateUser(
        @request() request: express.Request,
        @response() response: express.Response
    ): Promise<boolean | express.Response> {
        const updatedUser = request.body;
        try {
            await this.userRepository.updateUser(updatedUser);
            response.send({status: 'Successful'});
        } catch (error) {
            return response.json(error);
        }
    }

    @httpDelete('/remove-user/')
    private async removeUser(
        @queryParam('token') request: string,
        @response() response: express.Response
    ): Promise<boolean | express.Response> {
        try {
            await this.userRepository.removeUser(request);
            response.send({status: 'Successful'});
        } catch (error) {
            return response.json(error);
        }
    }

    @httpPost('/add-user/')
    private async addUser(
        @queryParam('token') request: string,
        @response() response: express.Response
    ): Promise<boolean | express.Response> {
        try {
            await this.userRepository.addUser(request);
            response.send({status: 'Successful'});
        } catch (error) {
            return response.json(error);
        }
    }
}
