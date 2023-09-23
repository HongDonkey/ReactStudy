import logo from "./logo.svg";
import "./App.css";
import {useState} from "react"

function Header(props){
  return <header>
        <h1><a href="/" onClick={(event)=>{
          event.preventDefault(); // 클릭해도 이벤트가 일어나지 않게 방지
          props.onChangeMode();
        }}>{props.title}</a></h1>
      </header>
}

function Nav(props){
  const lis = []
  
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={"read/" + t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); //event 객체가 가지고 있는 이벤트를 유발한 target의 id를 가져와서 파라미터로 사용
      // Number함수는 문자열을 숫자로 바꿔줌
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function Article(props){
  return  <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault(); //페이지에 새로고침을 막음(onSubmit은 페이지를 폼 태그 정보를 가지고 이동함)
      //event의 target은 form 태그이고 title과 body라는 name의 value를 가져온다
      const title = event.target.title.value
      const body = event.target.body.value
      props.onCreate(title, body)
    }}>
      <p><input  type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props){
  //리액트의 props는 readOnly속성이기 때문에 업데이트하기 위해서는 state로 바꿔줘야 함
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body)
  return <article>
  <h2>Update</h2>
  <form onSubmit={event=>{
    event.preventDefault(); //페이지에 새로고침을 막음(onSubmit은 페이지를 폼 태그 정보를 가지고 이동함)
    //event의 target은 form 태그이고 title과 body라는 name의 value를 가져온다
    const title = event.target.title.value
    const body = event.target.body.value
    props.onUpdate(title, body)
  }}>
    <p><input  type="text" name="title" placeholder="title" value={title} onChange={event=>{
      console.log(event.target.value)
      //html에서는 onChange이벤트가 마우스 포인터가 밖으로 빠지면 발생하지만
      //리액트에서는 입력하는 즉시 반영됨
      setTitle(event.target.value)
    }}/></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
      setBody(event.target.value)
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}

function App() {
  // const _mode = useState("WELCOME");
  // console.log("_mode", _mode)
  // const mode = _mode[0] // useState 메소드의 상태의 값을 읽는다
  // const setMode = _mode[1] // useSate 메소드의 상태의 값을 변경한다
  
  const [mode, setMode] = useState("WELCOME") // 주석된 위의 코드를 가독성 좋게 변경한다
  const [id, setId] = useState(null) //id의 초기값을 null로 지정
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:"html", body: "html is ..."},
    {id:2, title:"css", body: "css is ..."},
    {id:3, title:"js", body: "js is ..."}
  ])

  let content = null;
  let contextControll = null;
  if(mode === "WELCOME"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === "READ"){
    let title, body =null;
    for(let i = 0; i < topics.length; i++){
      if(topics[i]. id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControll = <>
    <li><a href={"/update/" + id} onClick={event=>{
      event.preventDefault();
      setMode("Update")
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = []
      for(let i = 0; i<topics.length; i++){
        if(topics[i].id !== id){
          console.log("topics[i].id : " + topics[i].id)
          console.log("id : " + id)
          //topics의 복제본인 newTopics로 새로운 topcis를 만든다
          newTopics.push(topics[i])
        }
      }
      setTopics(newTopics)
      setMode("WELCOME")
    }}></input></li>
    </>
  } else if(mode === "Create"){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode("READ")
      setId(nextId)
      setNextId(nextId+1)
    }}></Create>
  } else if(mode === "Update"){
    let title, body =null;
    for(let i = 0; i < topics.length; i++){
      if(topics[i]. id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title, body)
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i = 0; i < newTopics.length; i++){
          if(newTopics[i].id === id){
          newTopics[i] = updatedTopic
          break
        }
      }
      setTopics(newTopics)
      setMode("READ")
    }}></Update>
  }
  

  return (
   <div>
    <Header title="REACT" onChangeMode={()=>{
      // mode = "WELCOME"
      setMode("WELCOME")
    }}></Header>     
    <Nav topics={topics} onChangeMode={(_id)=>{
      // mode = "READ"
      setMode("READ")
      setId(_id)
    }}></Nav>  
    {/* <Article title="Welcome" body="Hello, WEB"></Article> */}
    {content}
    <ul>
    <li><a href="/create" onClick={event=>{
      event.preventDefault()
      setMode("Create")
    }}>Create</a></li>
    {contextControll}
    
    </ul>
   </div>
  );
}

export default App;
