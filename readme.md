<div align="center">
  <img alt="structure" src="https://github.com/wcroachie/flash-8-commands/blob/main/DEMO.gif?raw=true" width="88%">
</div>

<pre>
flash 8 commands for rotating and flipping the stage. I wrote these in 2023. should make the drawing experience a hell of a lot easier for people like me who like to rotate and flip their art as they work :)

what this does: rotates and flips entire drawing surface without transforming or altering anything, similar behavior to in art programs like photoshop and krita when flipping/rotating the canvas.

INSTALLATION INSTRUCTIONS
  - this works in flash 8. untested on anything newer.

1) before running flash:
  drag everything in the commands folder to here:
    C:\Users\[ MY USERNAME ]\AppData\Local\Macromedia\Flash 8\en\Configuration\Commands\
  drag everything in the tools folder to here:
    C:\Users\[ MY USERNAME ]\AppData\Local\Macromedia\Flash 8\en\Configuration\Tools\
    
2) open flash
3) create a new file
4) create 1 symbol. put the 1 symbol on the timeline in 1 layer in 1 frame .use f5 to extend this single keyframe to the duration of your project. everything you make will need to be nested within this symbol for this to work.
5) double click the symbol or click open in place
6) start drawing or paste your frames or whatever
7) to flip the stage, go to the Commands dropdown (on the top bar) and select the desired command to run it. You can bind keyboard shortcuts to these.
8) if you want to use the rotate tool with the mouse, go to edit > customize tools panel > and then click the square on the left where you wanna place the tool. find the smiley face that says RotateStage tool and add that to the tool slot. you can then use the tool with the mouse*

* caveat - it seems like it's impossible to set a keyboard shortcut to summon a custom tool, flash only allows keys to be bound to built-in tools. sorry
</pre>
