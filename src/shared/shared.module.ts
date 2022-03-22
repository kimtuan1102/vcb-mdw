import {Global, Module} from '@nestjs/common';
import {HttpModule} from "../modules/http/http.module";

@Global()
@Module({
    imports: [
        HttpModule
    ],
    exports: [
        HttpModule
    ]
})
export class SharedModule {}
