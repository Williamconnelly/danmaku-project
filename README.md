# danmaku-project

General Assembly WDI-19 Project 1: Danmaku

## Initial Planning and Experimentation

I have to make a game! But where to begin? What kind of game should I make? Otherwise bereft of answers, I was certain of only one thing at the outset of my project - that I wanted my game to involve player movement via key inputs. With nothing else to go on, I immediately threw together a conceptual mock-up of how I might make my player move in the form of a red square on a lightblue background. My first thought was a switch statement which would take each key pressed and issue a corresponding movement command to my div through DOM manipulation. Upon reading about keyboard events, I learned that Event.keyCode was depreciated and opted for the more explicit .key in its stead. As for how to track the initial user-input, I tested a few ideas however eventually settled on a boolean object to toggle between active and inactive states. I now possessed the ability to whimsically move my square around the page as I saw fit. It was at this point I realized that I wanted my game to involve player movement as a central theme of execution and thus I arrived at the premise of a classic arcade shooter - a genre of precise player movement and timing. 

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-1.png)

## The Project Begins

Now with a vision for my project in mind, I imported the logical design of my movement into a new directory and set to work. Before designing anything more, I first considered what features my game would need in order to become fully realized. My initial list detailed a player, enemies, bullets, a scoreboard, player lives, bosses, and varying bullet patterns. With this rough estimate of what lay ahead, I began by refining my movement inputs to be more responsive and respond to multi-key, diagonal inputs. Though this fixed some of the clunkiness, my player square still lurched forward with each move. Rather than leaving my movement purely up to DOM manipulation, I needed an interval which is how I discovered the lovely requestAnimationFrame - an elegant solution to my problem. I decided that, as opposed to some traditional shooter designs, I wanted my game to have a wide display. I then hardcoded the limitations of my player's movement to the value positions my new gamescreen and with that, my core input functionality was completed.

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-2.png)

## Bullet Hell

But wait! There's one more component yet missing from my player's inputs. The ever-implicit aspect of a shooter... the ability to shoot. My initial bullet design was a promising yet naive one. In the same way that I made my player square move, I too could make a div move in the manner of a bullet across the screen. By attaching a class identifier to each instance of a bullet, I planned to move them by the premise of their likeness however I immediately ran into the problem of needing to move more than a single bullet at a time. So I created an incrementing variable by which I could assign each generated div it's own unique ID. I would then, through my animation interval, alter the DOM position of the div at a high speed in order to simulate a bullet. And wah-lah! Working bullets! 

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-3.png)

After creating some mock-up enemies that gradually floated down the screen, I set about the most daunting of my tasks, tracking bullet collision. Though things were about to go downhill fast, I was pleased with my approach to the problem. As a bullet moved, I would check its x and y position in the DOM and by adding the values of its width and height to the calculation, I could create an exact spatial equivalence to where the bullet was in each frame of my interval. It was only when the values of my bullets and those of my enemies overlapped that my code would need to do anything. It was at this point, as I joyfully held down my firing key and watched countless divs fly off the screen that I encountered the critical failure of my design. 

## Refactoring!

Severe performance degradation. With each animation loop, processing 60 times a second, I was asking of the DOM the x, y, width, and height of practically every div on screen through varying uses of .offset and .position. My logic was sound, but my execution was laughably inefficient. This was a problem that I needed to fix from the ground up. Luckily for me, it was early on in my development and most of my design concepts were practical enough that I could port them with renewed efficiency into my new script. This all brought about two major changes that would shape the rest of my project. In order to slim down my interaction with the DOM, I needed to localize the values of my divs to my script, so I created a game object that would serve as the basis for everything - from players to bullets. I also created a central game loop using requestAnimationFrame which would handle all instances of div movement. Instead of individualized classes, I could govern all of my divs by iterating through different arrays of active instances of their objects. 

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-4.png)

## Design Stage

With my game now refactored, everything was much more tightly written and far more accepting of new features. I had a player div the user could control, randomly spawning enemies, and accurate bullet logic for both of them. With no performance degradation in sight and the core functionality of my game complete, it was at last time to move on from my unstyled, box aesthetic. As classic arcade shooters were at the root of my inspiration, I opted to make a HUD-like display on either side of my gamescreen. The left would display vital player information such as health and score while my right-hand screen could manage stats and other more flexible information. I found open-source sprites I could use for my div backgrounds and suddenly, my game transformed completely. I then created a landing page in the form of a detailed instructions menu and restructured many of my functions to work in

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-5.png)

## Multiplayer

At this point, with my game styled, a new scoring system in place, and my core functionality complete, my game was effectively playable. You could shoot, be shot, score, and lose. Up until this point, each feature I tackled was closely related to my initial expectation of the game and thus most of my code existed within the formatting of my plan. When it came to adding an unanticipated feature of my game however, like a second player, many of my functions required significant retooling. Though I had all of the logic and code ready for manipulating and interacting with a player already in place, it was all I could do to duplicate much of my code and add caveat after caveat to my functions in order to fully integrate my second player. 

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-6.png)

## Final Features

With co-op play now available, I again turned my attention to the handful of features still lacking from my initial perception of the game. In the final stages of my development, I added more variance to enemy bullet patterns as well as power-ups for the players in order to create more risk/reward scenarios. 

## Retrospective and Conclusion

As a whole, I had a ton of fun with this project and learned a lot with each new stage of its development. You can never be prepared enough at the outset of your design process, nor can you always fit in the features you want. The most difficult aspect of my design was definitely managing my bullets and their collision logic. I had to find very careful ways of removing them from an animation process that was constantly looking for something that was there one minute and gone the next. 

![image1](https://github.com/Williamconnelly/danmaku-project/blob/master/img/screenshot-7.png)

My co-op feature, while functional, definitely comes off as a second-thought, especially in my code which wasn't dynamic enough to easily accept a second player without major redundency. Were I to continue working on the project, I would refactor a good deal of my functions down into more comprehensive versions of themselves and add some of the features yet missing such as bosses, more responsive enemies, more power-ups, and generally more communicative game design in general. I am nonetheless happy with my game however and have a good deal of fun playing it. Go ahead and give it a shot if you think you can handle half as many divs whizzing about you as I had throughout this whole development process. 

## List of Technologies Used

* HTML
* CSS
* JQuery
* JavaScript