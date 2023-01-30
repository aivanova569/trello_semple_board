import passport from "passport";
import { StrategyName } from "@/common/enums/strategy/strategy-name.enum";

const jwt = passport.authenticate(StrategyName.JWT, { session: false });

export { jwt };