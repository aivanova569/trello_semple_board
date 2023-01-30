import passport from "passport";
import { StrategyName } from "../../common/enums/strategy/strategy-name.enum";

const authentication = passport.authenticate(StrategyName.LOGIN, { session: false });

export { authentication };