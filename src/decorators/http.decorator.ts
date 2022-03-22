import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiUnauthorizedResponse} from "@nestjs/swagger";

import {SimpleAuthGuard} from "../guards/auth.guard";

export function SimpleAuth(): any {
    return applyDecorators(
        UseGuards(SimpleAuthGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    )
}