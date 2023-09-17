import logo from './logo.svg';
import './App.css';

function Header(props){
  console.log('props', props)
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
        props.onChangeMode(event.target.id); //event 객체가 가지고 있는 이벤트를 유발한 target의 id를 가져와서 파라미터로 사용
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

function App() {
  const topics = [
    {id:1, title:'html', body: 'html is ...'},
    {id:2, title:'css', body: 'css is ...'},
    {id:3, title:'js', body: 'js is ...'}
  ]
  return (
   <div>
    <Header title="REACT" onChangeMode={()=>{
      alert('Header')
    }}></Header>     
    <Nav topics={topics} onChangeMode={(id)=>{
      alert(id)
    }}></Nav>  
    <Article title="Welcome" body="Hello, WEB"></Article>
   </div>
  );
}

export default App;
