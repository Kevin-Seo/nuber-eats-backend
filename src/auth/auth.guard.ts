import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    // console.log(user);

    if (!user)
      return false;
      
    return true;
    // return false 하면 request 를 막고
    // return true 하면 request 를 통과시킨다.
  }

}