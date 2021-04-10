import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Moment from "react-moment"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Layout from "components/Layout"

const PostHeroContainer = styled("div")`
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`

const PostHeroAnnotation = styled("div")`
  padding-top: 0.25em;

  h6 {
    text-align: right;
    color: ${colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`

const PostCategory = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: ${colors.grey600};

  h5 {
    margin-top: 0;
    margin-bottom: 1em;
  }
`

const PostTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;

  h1 {
    margin-top: 0;
  }
`

const PostBody = styled("div")`
  max-width: 700px;
  margin: 0 auto;

  h2 {
    color: ${colors.blue700};
  }

  h3 {
    margin: 1.5em 0 0.3em;
  }

  h4 {
    margin-bottom: 0.3em;
    color: ${colors.grey700};
  }

  h5 {
    margin: 0.2em 0;
    font-weight: 700;
    color: ${colors.green600};
  }

  ul {
    padding: 0;
    margin: 0.3em 0;
    list-style-type: none;

    li {
      word-break: keep-all;

      blockquote {
        margin: 0.5em 0;
      }
    }
  }

  span {
    color: ${colors.blue600};
  }

  code {
    background-color: ${colors.blue100};
    display: inline-block;
    padding: 0 0.5em;
    margin: 0 0.2em;
    border-radius: 0.3em;
    font-size: 85%;
    color: #333;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.6;
  }

  a {
    border-bottom: 0.01rem solid ${colors.blue600};
    color: #333;
    text-decoration: none;

    :hover {
      color: ${colors.blue600};
    }
  }

  blockquote {
    border-left: 0.25rem solid ${colors.blue500};
    margin: 0 0 1rem;
    padding: 0 0 0 1.25rem;
    display: block;
    margin-block-start: 0.2em;
    margin-block-end: 1.5em;
    word-break: keep-all;
  }

  strong {
    position: relative;

    :after {
      content: "";
      display: inline-block;
      position: absolute;
      height: 8px;
      width: 100%;
      bottom: 0px;
      background-color: ${colors.blue400};
      opacity: 0.25;
      left: 0;
    }
  }

  .block-img {
    margin-top: 0.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }

  p {
    margin: 0 0 6px 0;
    word-break: keep-all;
  }
`

const PostMetas = styled("div")`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${colors.grey600};
`

const PostAuthor = styled("div")`
  margin: 0;
`

const PostDate = styled("div")`
  margin: 0;
`

const Post = ({ post, meta }) => {
  // const markdown = RichText.asText(post.post_body)
  const markdown = `
# 안녕하세요. 저는 <span>임대호</span>입니다.

> 10년 동안 빠르게 변화하는 중국에서 지내며 **생활에 밀접하고 동시에 많은 영향을 끼치는 어플리케이션**들을 사용하며 개발에 대해 관심을 갖게 되었습니다.

> 다년간 중국, 미국에서 생활하며 **새로운 환경에 적응하는 것을 두려워 하지 않습니다.** 새로운 만남은 항상 즐겁고 새로운 도전은 항상 설레는 일입니다.

> 너무 과한 고민은 하지 않습니다. **일단 시작해서 부딪히며 배우고 경험(삽질)**하며 익히는 것이 제가 성장하는 방법입니다.

> **Front, Back 모든 영역을 두루두루 배우길 좋아합니다.** 다방면으로 넓게 아는 사람이 되길 지향하고, 지식적으로 문제없이 백엔드 개발자와 소통 할 수 있는 개발자가 되길 노력합니다.

<h4>저에 대해 조금 더 알고 싶으시다면</h4>
<details>
  <summary><b>Self-Interview</b></summary>
  <ul>
    <li><b>- 왜 개발자를 하게 되었나요?</b></li>
    <h5>개발자는 좋은 영향력이 있는 사람이라 생각했습니다.</h5>
    <p>중국에서 다양한 어플리케이션들을 사용하면서, 이 크고 작은 서비스 하나하나가 누군가에게는 삶의 질을 바꾸고 뛰어난 파급력로 사회에도 큰 영향을 미친다고 생각하였습니다. 그런 <strong>영향력을 받지만 말고 영향력을</strong> <strong>끼치고 흐름을 주도하는 사람</strong>이 되어야겠다고 생각했습니다.</p>
    <h5>배움에는 쉼이 없다.</h5>
    <p>새로운 것을 배운다는 것은 쉽지 않은 일이지만, 사람은 죽을때까지 <strong>배움을 멈추어선 안된다</strong>는게 제 모토입니다. 그러한 점이 개발자의 장점이라 여겨졌습니다. </p>
    <p>중국 논어에 '三人行，必有我师焉；择其善者而从之，其不善者而改之' 이란 말이 있습니다. '세 사람이 길을 가면 그 가운데 반드시 나의 스승이 있으니, 선한 것은 가려서 따르고, 선하지 못한 것은 거울로 삼아 고쳐야 한다'라는 말입니다. <strong>개발자에게 배움이란 언어나 스킬에 대한 배움도 있겠지만, 사람으로서 부족한 면도 </strong><strong>겸손하게 고치기 위해서 노력합니다.</strong></p>
    <br />
    <li><b>- 어떤 개발자가 되고 싶은가요?</b></li>
    <h5>함께하는 팀 문화, 개발 문화에 기여하고 싶습니다.</h5>
    <p>좋은 팀 문화, 개발 문화는 결국 이루고자 하는 서비스에도 영향을 미친다고 생각합니다. 그래서 기업의 철학과 좋은 문화로부터 시작된 공동체가 <strong>함께 할 때 만들어 낼 수 있는 가치</strong>를 중요하게 생각합니다. </p>
    <p>이러한 팀 문화, 개발 문화를 먼저 배우고 또 잘 지키고 발전시키며, 이후 동료 개발자가 될 사람들에게도 좋은 영향을 끼치고 싶습니다.</p>
    <h5></h5>
    <p></p>
  </ul>
</details>

<br />

---

## Personal Projects
팀 프로젝트가 끝나고 개인적으로 진행한 프로젝트들입니다. 주로 기존 코드를 리팩토링하고 평소 사용해보고 싶은 기술을 도입하여 개발하였습니다.

<div>
  <h3><a href="http://localhost:8000/work/4">DM Friends TS.ver</a></h3>
  <b>설명</b>
  <blockquote>
    <p>팀 프로젝트로 진행하였던 DM Friends 프로젝트를 개인적으로 <strong>리팩토링</strong>하고 구현해보지 못한 기능을 구현해보았습니다.</p>
    <p>타입스크립트 기반으로 개발하였고, 함수형으로 리팩토링, <strong>Redux(saga)로 상태 관리</strong>하였고, <strong>SWR</strong>까지 도입해 보았습니다.</p>
  </blockquote>
  <b>내가 구현한 기능</b>
  <blockquote>
    <ul>
      <li>- <code>useSWRInfinite</code>를 이용한 무한 스크롤링(메인 페이지)</li>
      <li>- Redux-saga를 이용한 장바구니 기능 구현</li>
      <li>- <code>useSWR</code>Hook을 사용하여 로그인 상태 관리</li>
      <li>- Craco(Library)를 활용하여 CRA Config 설정</li>
    </ul>
  </blockquote>
  <details>
    <summary><b>기억에 남는코드</b></summary>
      <div class="block-img">
        <img src="https://images.prismic.io/resume-daeho/21f9898d-47ba-4a60-840e-57e13b48b2b2_ts2.png?auto=compress"/>
      </div class="block-img">
      <p><code>useSWRInfinite</code> Hook을 이용해서 Feed Page를 무한스크롤하는 코드입니다. SWR이 리덕스의 기능을 조금 대체할 수 있는 역할을 할 수 있다는 사실을 알고 SWR을 사용해보다가 무한 스크롤 전용 Hook이 있어서 적용해 보았습니다.<p>
      <p>스크롤이 맨 밑으로 내려갔을때 받아오는 데이터가 중첩 배열로 오기 때문에 그걸 일차 배열로 만드는데 조금 헤맸지만, 상당히 간단하고 사용하기 편한 Hook이란 생각이 듭니다.</p>
  </details>
  <br/>
  <b>기술 스택</b>
  <blockquote>
    <p>TypeScript, React(Hook), Redux(saga), SWR<p>
  </blockquote>
</div>

<div>
  <h3><a href="http://localhost:8000/work/3">DM Friends Back-end</a></h3>
  <b>설명</b>
  <blockquote>
    <p>먼저 Express로 백엔드 서버를 구현하였습니다. ORM은 <strong>Prisma</strong>를 DB는 <strong>MySQL</strong>을 사용하였습니다. </p>
    <p>프로젝트 완성 후, 타입스크립트 기반으로 리팩토링하였고, 최종적으로는 <strong>Serverless Framework</strong>를 이용하여 <strong>AWS Lambda에 배포</strong>까지 하였습니다.</p>
  </blockquote>
  <b>내가 구현한 기능</b>
  <blockquote>
    <ul>
      <li>- 모델링, MVC Pattern으로 설계 및 모듈화, 에러 핸들링</li>
      <li>- SignUp, LogIn, Product, Cart등 서비스 API</li>
      <li>- AWS RDS 생성 및 DB 덤프</li>
      <li>- Prisma Lambda 환경 세팅</li>
      <li>- Serverless Framework 사용해서 AWS Lambda 배포</li>
    </ul>
  </blockquote>
  <details>
    <summary><b>기억에 남는코드</b></summary>
      <div class="block-img">
        <img src="https://images.prismic.io/resume-daeho/7c8b0822-cde9-41e9-a777-4062bc26c9de_back.png?auto=compress"/>
      </div class="block-img">
      <p>장바구니에서 선택된 아이템들만 삭제하는 함수입니다. <code>product_id</code>가 1개 혹은 여러개로 올 수 있기 때문에 <code>Promise.all</code>처럼 <code>$transaction</code>에 담아서 작동시키면 복수의 작업들을 수행하게 할 수 있습니다.</p>
  </details>
  <br/>
  <b>기술 스택</b>
  <blockquote>
    <p>TypeScript, Express, Prisma, MySQL, Serverless, AWS Lambda, AWS RDS<p>
  </blockquote>
</div>
<br />


## Team Projects
Wecode에서 함께한 팀원들과 같이 진행한 프로젝트입니다. 
총 2번의 팀 프로젝트를 진행하였고, 커머스 사이트의 **구매 기능**과 항공사 사이트의 **예매 기능**을 중점으로 구현하였습니다.

<div>
  <h3><a href="http://localhost:8000/work/2">TangWay'Air</a></h3>
  <b>설명</b>
  <blockquote>
    <p>국내 항공사 T'way Air의 웹 페이지를 참조하여 프로젝트를 진행하였습니다.</p>
    <p>항공사 사이트의 핵심 기능인 예매와 소셜 로그인을 목표로 구현하였습니다.</p>
  </blockquote>
  <b>내가 구현한 기능</b>
  <blockquote>
    <ul>
      <li>- Redux를 이용한 유저의 예매 정보와 상태 관리</li>
      <li>- state를 props로 활용하여 예매창의 동적 레이아웃 구현</li>
      <li>- react-date와 moment를 활용한 날짜 선택 가능한 달력</li>
    </ul>
  </blockquote>
  <details>
    <summary><b>기억에 남는코드</b></summary>
      <div class="block-img">
        <img src="https://images.prismic.io/resume-daeho/4b463196-1ef2-4b83-ba35-8f3dc95853eb_tangway1.png?auto=compress"/>
        <img src="https://images.prismic.io/resume-daeho/9984b07d-9d4a-42ea-b9e5-76b889296ee2_tangway3.png?auto=compress"/>
      </div class="block-img">
      <p>항공권 예매시 지역/국가를 선택하면 해당 국가의 도시의 목록이 나오는 이중 메뉴 탭을 구현하는 코드입니다. (ex. 한국 -> 서울,부산 / 미국 -> 뉴욕,LA)</p>
      <p><code>activeID</code>라는 state를 만들어서 국가을 누르면 해당 지역의 ID를 state에 저장하고 하위 컴포넌트(도시 목록)에서 해당하는 배열만 렌더링 시키도록 만들었습니다.</p>
      <p>이전에 메뉴탭을 하드코딩으로 만든적이 있어서 꼭 구현해보고 싶었던 기능인데, 생각보다 쉽게 구현해냈습니다. 그런 제 자신이 대견해서 기억에 남기고 싶은 코드로 뽑았습니다.</p>
  </details>
  <br/>
  <b>기술 스택</b>
  <blockquote>
    <p>React Hook, Styled-Component, Redux<p>
  </blockquote>
</div>

<div>
  <h3><a href="http://localhost:8000/work/1">DM Friends</a></h3>
  <b>설명</b>
  <blockquote>
    <p>카카오 프렌즈샵을 참조하여 프로젝트를 진행하였습니다.</p>
    <p>기존 사이트의 피드와 댓글, 상품을 구매하는 로직을 따라 필터링, 장바구니 기능까지 구현하였습니다.</p>
  </blockquote>
  <b>내가 구현한 기능</b>
  <blockquote>
    <ul>
      <li>- 기존 state에 selected 프로퍼티 추가 후 전체 선택, 개별 선택 기능 구현</li>
      <li>- 선택된 제품 삭제, 각각 삭제 기능</li>
      <li>- 수량 변경</li>
      <li>- Slick-Carousel을 활용한 이미지 슬라이더 구현 및 커스터마이징</li>
      <li>- BottomBar를 통한 수량 변경 및 장바구니 추가시 toast 알림 애니메이션</li>
      <li>- 리뷰 댓글 Pagination 및 좋아요, 최신순 정렬 기능 구현</li>
    </ul>
  </blockquote>
  <details>
    <summary><b>기억에 남는코드</b></summary>
      <div class="block-img">
        <img src="https://images.prismic.io/resume-daeho/e54c3340-9939-488d-b0fe-fadcfdeb48b8_dm+select.png?auto=compress"/>
      </div class="block-img">
      <p>장바구니에서 상품을 전체 선택하거나 해제 할 수 있도록 하는 코드입니다.</p>
      <p>장바구니에 추가되는 상품이 몇개가 될지 알 수 없기 때문에, state를 부여해서 관리하는 것은 비효율적인이라 생각했습니다. 그래서 장바구니에 추가된 모든 상품에 <code>selected</code>라는 프로퍼티를 추가하고 reduce 메서드를 이용해서 모두 선택 버튼을 구현하였습니다.</p>
  </details>
  <br/>
  <b>기술 스택</b>
  <blockquote>
    <p>React(Class), Sass, Slick-Carousel<p>
  </blockquote>
</div>

---

## Skills

### **FRONT-END**

<ul>
  <li>
    <b>JavaScript</b>
    <blockquote>
      <p>자바스크립트의 핵심 개념과 동작 원리를 이해하고 있습니다. ES6 이후의 자바스크립트 문법을 활용해 프로젝트에 적용할 수 있으며, 함수형 프로그래밍에 대해 공부하고 있습니다.</p>
    </blockquote>
  </li>
  <li>
    <b>React</b>
    <blockquote>
      <p>React의 Life-cycle에 대해 잘 알고 있으며, 관련 메소드를 상황에 따라 적절히 사용합니다. 또한, <code>useCallback</code>, <code>useMemo</code> 내장 Hook을 통해 성능 최적화에 노력합니다.</p>
      <p>data fetching에 특화된 React Hook인 SWR을 사용하여 상태를 최신화하여 관리 할 수 있습니다.</p>
      <p>항상 컴포넌트 재사용에 대해 고민하며 컴포넌트를 나누고, Custom Hook에 대해 더 공부하고 있습니다.</p>
    </blockquote>
  </li>
  <li>
    <b>Redux</b>
    <blockquote>
      <p>Redux의 필요성에 대해서 프로젝트를 통하여 체감하였습니다. 상태를 관리하고 Redux-Saga를 이용해서 비동기 처리를 능숙하게 구현합니다.</p>
    </blockquote>
  </li>
  <li>
    <b>React-Native</b>
    <blockquote>
      <p>Expo를 이용하여 개발 환경 세팅을 할 수 있고, 기본적인 개발은 문제없이 진행 할 수 있습니다.</p>
    </blockquote>
  </li>
  <li>
    <b>TypeScript</b>
    <blockquote>
      <p>모든 작업을 타입스크립트 기반으로 작업하며 필수적인 타입을 지정하며 점진적으로 익히고 있습니다.</p>
    </blockquote>
  </li>
<ul>

### **BACK-END**
<ul>
  <li>
    <b>Node.js, Express</b>
    <blockquote>
      <p>Express로 라우팅과 로직 모듈화를 할 수 있고, 모듈화의 장점을 파악하고 있습니다.</p>
      <p>MVC Pattern에 대해 이해하고 장점을 알고 있으며, 각각의 Layer의 의존성과 어떤 기능을 하는지 이해합니다.</p>
    </blockquote>
  </li>
  <li>
    <b>Prisma</b>
    <blockquote>
      <p><code>FindUnique</code>, <code>include</code>, <code>$transaction</code>등 prisma 문법을 다루는데 능숙하며 RDBMS에 대해 이해하고 있습니다.</p>
    </blockquote>
  </li>
<ul>

### **ETC**
<ul>
  <li>
    <b>AWS</b>
    <blockquote>
      <p>RDS에 기존 DB를 덤프시키고, 데이터를 추가, 삭제하고 Lambda에 연결 시킬 수 있습니다. 또한, CloudWatch로 로그를 확인하며 개발을 진행 할 수 있습니다.</p>
      <p>Serverless Framework를 이용하여 Lambda 배포 경험이 있습니다. </p>
    </blockquote>
  </li>
<ul>
<br />

---

## Education

### **Wecode Bootcamp**
2020.11 - 2021.2

### **Beijing International Studies University**
2018.02 - 2020.6 <b>북경제2외국어대학 중국어학과 졸업</b>

### **Beijing University of Technology**
2012.09 - 2015.6 <b>북경공업대학 건축학과 (중퇴)</b>

`

  return (
    <>
      <Helmet
        title={`Resume | 임대호`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${post.post_title[0].text} | 임대호`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Layout>
        <PostCategory>{RichText.render(post.post_category)}</PostCategory>
        <PostTitle>{RichText.render(post.post_title)}</PostTitle>
        <PostMetas>
          <PostAuthor>{post.post_author}</PostAuthor>
          <PostDate>
            <Moment format="MMMM D, YYYY">{post.post_date}</Moment>
          </PostDate>
        </PostMetas>
        {post.post_hero_image && (
          <PostHeroContainer>
            <img src={post.post_hero_image.url} alt="bees" />
            <PostHeroAnnotation>
              {RichText.render(post.post_hero_annotation)}
            </PostHeroAnnotation>
          </PostHeroContainer>
        )}
        <PostBody>
          <ReactMarkdown
            plugins={[gfm]}
            children={markdown}
            escapeHtml={false}
          />
        </PostBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const postContent = data.prismic.allPosts.edges[0].node
  const meta = data.site.siteMetadata
  return <Post post={postContent} meta={meta} />
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  query PostQuery($uid: String) {
    prismic {
      allPosts(uid: $uid) {
        edges {
          node {
            post_title
            post_hero_image
            post_hero_annotation
            post_date
            post_category
            post_body
            post_author
            post_preview_description
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
