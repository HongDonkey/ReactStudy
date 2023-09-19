import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

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
      <a id={t.id} href={'read/' + t.id} onClick={event=>{
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
      <p><input  type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}

function App() {
  // const _mode = useState('WELCOME');
  // console.log('_mode', _mode)
  // const mode = _mode[0] // useState 메소드의 상태의 값을 읽는다
  // const setMode = _mode[1] // useSate 메소드의 상태의 값을 변경한다
  
  const [mode, setMode] = useState('WELCOME') // 주석된 위의 코드를 가독성 좋게 변경한다
  const [id, SetId] = useState(null) //id의 초기값을 null로 지정
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body: 'html is ...'},
    {id:2, title:'css', body: 'css is ...'},
    {id:3, title:'js', body: 'js is ...'}
  ])

  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body =null;
    for(let i = 0; i < topics.length; i++){
      if(topics[i]. id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'Create'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode('READ')
      SetId(nextId)
      setNextId(nextId+1)
    }}></Create>
  }

  return (
   <div>
    <Header title="REACT" onChangeMode={()=>{
      // mode = 'WELCOME'
      setMode('WELCOME')
    }}></Header>     
    <Nav topics={topics} onChangeMode={(_id)=>{
      // mode = 'READ'
      setMode('READ')
      SetId(_id)
    }}></Nav>  
    {/* <Article title="Welcome" body="Hello, WEB"></Article> */}
    {content}
    <a href='/create' onClick={event=>{
      event.preventDefault()
      setMode('Create')
    }}>Create</a>
   </div>
  );
}

export default App;
