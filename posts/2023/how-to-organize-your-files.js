/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#This File Management System Changed My Digital Life

I came across a file organization [tutorial](https://www.youtube.com/watch?v=MM-MPS57qKA&t) several months back. It seemed straight forward enough. And it looked to solve a problem I'd recently bumped into. 

I'd been drafting a book and relying on my [reMarkable tablet](https://remarkable.com/store/remarkable-2) to document much of my ideation. The tablet is a nice tool, but the file storage model felt limited. Originally, I'd attempted to follow the [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten), or slip box, method. My experiment involved organizing like files using naming conventions. I tried this, opposed to sorting files via folder hierarchy, because I needed all files in the same folder depth. This way I could scroll through a sinlge folder and take it in holistically. But the naming conventions fell apart as the project ballooned. The experience planted the idea that I needed to step up my file management game.

So after watching the tutorial, I gave this method a try. After working with it for a month or so, the benefits were obvious. Pretty soon my work PC, personal PC, and Google Drive followed suit.

Here's a quick visual of the format of, say, my Documents folder:
\`\`\`
[01] My most visited folder
[02] My second most visited folder
[03] My third most visited folder
...
[99] Archive
\`\`\`
The bracketed and numbered naming convention ensures that your folders are presented in order of importance. The Archive folder holds all those files you're sure you'll never need, but too scared to delete. 

Within each top-level folder, we can continue the naming convention until we're ready to deal with our files:
\`\`\`
[01] My most visited folder
|		[01] My most visited nested folder
|		|		[01] My most visited nested folder
|		|		|		[01] My most visited nested folder
|		|		|		[02] My second most visited nested folder
|		|		|		[03] My third most visited nested folder
|		|		|		...
|		|		|		[99] Archive
|		|		[02] My second most visited nested folder
|		|		[03] My third most visited nested folder
|		|		...
|		|		[99] Archive
|		[02] My second most visited nested folder
|		[03] My third most visited nested folder
|		...
|		[99] Archive
[02] My second most visited folder
|		[01] My most visited nested folder
|		[02] My second most visited nested folder
|		[03] My third most visited nested folder
|		...
|		[99] Archive
...
[99] Archive
\`\`\`
The nesting will eventually bottom out to a folder of files. The depth depends on your over all folder complexity. The tutorial recommends not nesting any deeper than five total levels, but I've never had to get close to that depth.
\`\`\`
[01] My most visited folder
|		[01] My most visited nested folder
|		|		[01] My most visited nested folder
|		|		|		File A
|		|		|		File B
|		|		|		File C
|		|		|		File D
|		|		|		File E
|		[02] My second most visited nested folder
|		|		File A
|		|		File B
[02] My second most visited folder
|		File A
|		File B	
\`\`\`

Organizing the files can be as simple as the default sort. Or you can add the date, the project ID, etc. to further organize the folder contents.

Once you implement the system, you'll notice that the majority of your navigation clicks land on folders marked [01] or [02]. And since these are always on top, you can get to your desired files much faster than normal.
`