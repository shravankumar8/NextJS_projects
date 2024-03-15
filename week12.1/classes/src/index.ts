import { once, measur } from "helpful-decorators";
class dateClass {
  private timeZone: string;

  constructor(timeZone: string) {
    this.timeZone = timeZone;
  }

  @once
  getTimezone() {
    console.log("hi from expensive oper");
    return this.timeZone;
  }
}
const dp = new dateClass("ef");
dp.getTimezone();
dp.getTimezone();
dp.getTimezone();
dp.getTimezone();
dp.getTimezone();
dp.getTimezone();
dp.getTimezone();
