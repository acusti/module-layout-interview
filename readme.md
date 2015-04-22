## Folsom Labs Interview: Solar Panel Layout

In this question, you'll need to create a tiling algorithm to fill a user defined polygon with Solar Panels.  We've already created sample code that lets a user input a polygon on Google Maps and then draws a single rectangle representing a solar panel at an arbitrary point (`fillPolygon` is the relevant function here).

### Instructions
Spend an hour or two (please don't spend more time than that), to see how far you can get in implementing all the UI hooks.  Feel free to modify the code however you see fit.

You can view the code simply by opening index.html in a browser.  If you have any questions while working on it, please contact paul.gibbs@folsomlabs.com

#### If starting the problem from scratch it probably makes sense to go roughly in the order in the interface:

1. Using **Module Width** and **Module Height**, fill the polygon with valid modules.  These are both defined in meters.

2. Implement **row spacing** so that the user can space all the row of modules apart.  This is the number of meters between adjacent rows of modules.

3. Implement **Modules in Row** since usually solar panels are mounted together in groups, e.g. three modules together, then a gap, then three more modules, etc.

4. Implement **Module Orientation**, let users choose to place the modules in either portrait or landscape (e.g. each module individually rotated 90º)

5. Implement **tilt**, this is how far the modules are tilted up.  E.g. a module tilted at 45º has the top tilted up (so the module forms a 45º angle with the ground), so that the module is pointed more towards the sun.

6. Implement **azimuth**, in reality the modules could be oriented to face any direction (e.g. Southwest), azimuth defines which directions the modules face, where 0º is North, 180º is south, 90ª is East, and 270º is West


[This training video (1:39)](https://www.youtube.com/watch?v=cnyIpSLW6hg) from HelioScope shows how many of the rules work. [This image](https://helioscope.folsomlabs.com/static/helioscope/documentation/static/overlays/fixed-racking.png) from our documentation visualizes a few of these parameters: **row spacing**, **tilt**, and **modules in row** ('Frame Size = 4 Modules Up' would be the same as '4 **Modules in Row**')
