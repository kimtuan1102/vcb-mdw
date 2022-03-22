import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {HttpModule as BaseHttpModule, HttpService} from "@nestjs/axios";

@Module({
    imports: [
        BaseHttpModule
    ],
    exports: [
        BaseHttpModule
    ]
})
export class HttpModule implements OnModuleInit {
    protected logger = new Logger(HttpModule.name)
    constructor(private httpSvc: HttpService) {
    }

    onModuleInit(): any {
        const axios = this.httpSvc.axiosRef;

        axios.interceptors.request.use(
            (config) => {
                // Add start time to calculate duration
                config['metadata'] = {...config['metadata'], startDate: new Date()};
                return config;
            },
            (err) => {
                this.logger.error(err)
                return Promise.reject(err);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                //Add end time to calculate duration
                const {config} = response;
                config['metadata'] = {...config['metadata'], endDate: new Date()};
                const duration = config['metadata'].endDate.getTime() - config['metadata'].startDate.getTime();
                this.logger.log(`${config.method.toUpperCase()} ${config.url} ${duration}ms`);
                return response;
            },
            (err) => {
                const response = err.response ? err.response : err
                this.logger.error(response)
                return Promise.reject(err.response);
            });
    }
}
