document.addEventListener('DOMContentLoaded', function() {
  try{
    lsptFilter();
    lsptAddIgnoreBtn();
    this.addEventListener("storage", function(){
      if (key == "lobsterpot")
      {
        lsptFilter();
      }
    });
  }
  catch(e){}
});

function lsptIgnoreUser()
{
  var users = JSON.parse(localStorage.getItem("lobsterpot")) || [];
  var found = false;
  for (var i = 0; i < users.length; i++)
  {
    if ( users[i] == this.dataset.username)
    {
      found = true;
      break;
    }
  }
  if (found)
  {
    users.splice(i, 1);
    this.setAttribute("title", "Ignore User");
    this.textContent = '[x]'
  }
  else
  {
    users.push(this.dataset.username);
    this.setAttribute("title", "Unignore User");
    this.textContent = '[o]'
  }
  localStorage.setItem("lobsterpot", JSON.stringify(users));
}

function lsptFilter()
{
  var users = JSON.parse(localStorage.getItem("lobsterpot")) || [];
  for (var j = 0; j < users.length; j++)
  {
    var coms = document.querySelectorAll("a[href='/u/" + users[j] + "']:nth-of-type(3)");
    var com_id;
    for(var i = 0; i < coms.length; i++)
    {
      com_id = coms[i].parentNode.firstElementChild.name.substr(2);
      //Ew.
      try{
        var p = coms[i].parentNode.parentNode.lastElementChild;
        p.textContent = '--Filtered by lobsterpot--';
      }catch(e){}
    }
  }
}

function lsptAddIgnoreBtn()
{
  var users = JSON.parse(localStorage.getItem("lobsterpot")) || [];
  var names = document.querySelectorAll("a[href^='/u/']:nth-of-type(3)");
  var cur;
  for (var i = 0; i < names.length; i++)
  {
    var el = names[i];
    cur = el.innerText;
    var span = document.createElement('span');
    span.setAttribute("style", "cursor:pointer; font-size: 9.5pt; width: 1.4em;");
    span.setAttribute("data-username", cur);
    span.onclick = lsptIgnoreUser
    for (var j = 0; j < users.length; j++)
    {
      if (users[j] == cur)
      {
        span.setAttribute("title", "Unignore User");
        span.textContent = '[o]';
      }
    }
    if (!span.textContent)
    {
      span.setAttribute("title", "Ignore User");
      span.textContent = '[x]';
    }
    el.insertAdjacentElement('afterend', span);
  }
}
