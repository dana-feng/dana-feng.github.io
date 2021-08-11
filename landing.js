// document.addEventListener('scroll', function(e) {
//     let sections = document.getElementsByTagName("h2");
//     console.log(sections)
//     lastKnownScrollPosition = window.scrollY;
//     console.log("window", window.scrollY);
//     for (let section of sections) {
//         section = document.getElementById(section.id)
//         let nav = document.getElementsByClassName(section.id)
//         let bottom = section.offsetHeight + section.offsetTop
//         console.log(section.id, section.offsetHeight, section.offsetTop)
//         if (section.offsetTop < lastKnownScrollPosition < bottom) {
//             nav[0].classList.add("current");
//             console.log("add", section.id)
//         } else {
//             nav[0].classList.remove("current");
//             console.log("remove", section.id)

//         }
//     }
//   });