var myDiv = document.querySelector(".container");
var myBtn = document.querySelector(".btn");

function addCard() {
  var myImg = document.createElement("img");
  myImg.setAttribute("src", "./../images/fruits/coconut.png");
  myImg.classList.add(["w-100"], ["d-block"],['p-1']);

  var heading = document.createElement("h1");
  var headingText = document.createTextNode("My Coconut");
  heading.append(headingText);
  heading.classList.add("p-4");

  var paragraph = document.createElement("p");
  paragraph.textContent = "asdasd asdasd asdad asdad asd";

  var div = document.createElement('div');
  div.append(myImg , heading , paragraph);

  return div;
}


myBtn.addEventListener('click' , function(){
    var element =  addCard();
    myDiv.append(element);
});