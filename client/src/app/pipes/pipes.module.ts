import { NgModule } from "@angular/core";
import { TimesPipe } from "./pipes";

@NgModule({
  declarations: [TimesPipe],
  exports: [TimesPipe]
})
export class PipesModule {}