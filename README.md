> [!note]
> This app has been reduced to a simple html and javascript website. Nothing crazy here, hoping this will make this project easier to build. 

mattlieber.is is a compilation of all descriptions of Matt Lieber from the end credits of the Reply All podcast by Gimlet Media. Reply All ran from 24 November 2014 till 23 June 2022. 

## Getting Started

Open the index.html file as a live preview in vscode to see your changes reflected in real time. 

## Todos

1. ~~Current problem: Page is static. random number is generated once at build, and served to github pages:~~

   1. ~~Necessary Change 1: rewrite page to use useEffect to generate random number on each load.~~
   2. ~~Possible Option 1: store .json in local storage, and read from there.~~
   3. ~~Possible Option 2: create static pages of every single quote using generateStaticParams (which enables page linking from the all page).~~

2. ~~Another problem: IMAGES ARE NOT BEING REFERENCED CORRECTLY.~~

   1. ~~I need to figure out how to configure the basePath correctly. it's trying to fetch from /replyall.jpg rather than /mattlieberis/replyall.jpg despite "isProd" returning "true".~~

3. ~~Need to put the quote in the middle of the page.~~
4. ~~Make the accordion with description expand upwards.~~
5. ~~Make the about page one big accordion??? is that even good UX?~~
6. Add the (scramble in)[https://www.fancycomponents.dev/docs/components/text/scramble-in] effect for the quote.
7. Add a github link in nav bar.
8. Do up the about page!
   1. About the podcast.
   2. About why I created this project! Why though?
9. fix the non-scrolling episodes list page. 
10. make the bottom margin on the under the episodes details on the home page equal to top margin above navbar. 
