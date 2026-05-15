import { useState, useRef } from "react";
import "../assets/css/Community.css";
import "../assets/css/Commu.css";

interface Comment {
  commentId: number;
  author: string;
  text: string;
  createdDate: string;
}

interface Post {
  postId: number;
  boardId: string; 
  category: string; 
  author: string;
  content: string;
  likes: number;
  imgUrl: string;
  createdDate: string;
  comments: Comment[];
  memberId?: string;
  parentPostId?: number | null;
  quotePostId?: number | null;
  isAnonymous?: boolean;
  isLocked?: boolean;
  deletedDate?: string | null;
  isLikedByUser?: boolean;
}


interface BoardCategory {
  wrapperId: string;
  boardName: string;
  categories: string[];
  pendingCategories: string[]; 
}

export default function EatPickCommunity() {

  const [threadsData, setThreadsData] = useState<Post[]>([

    { postId: 1, boardId: "채식맛집", category: "서울/수도권", author: "비건조아", content: "인사동 오세계향 다녀왔어요! 버섯 불구이가 진짜 고기 같고 밑반찬도 훌륭하네요.", likes: 12, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 2, boardId: "채식맛집", category: "부산/경상", author: "낙동강비건", content: "해운대 홈 비건 브런치 카페 강추해요. 아보카도 토스트 대박 고소함!", likes: 8, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 3, boardId: "채식맛집", category: "제주/기타", author: "제주풀꾼", content: "제주도 서귀포 쪽에 작은 비건 책방 겸 카페 찾았어요. 고사리 파스타 대박..", likes: 14, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 4, boardId: "채식 자유", category: "서울/수도권", author: "샐러드보이", content: "요즘 편의점 비건 도시락 퀄리티 진짜 많이 좋아지지 않았나요?", likes: 3, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 5, boardId: "채식 자유", category: "부산/경상", author: "익명", content: "비건 베이킹 입문했는데 쌀가루랑 두유 배합 맞추기 생각보다 어렵네요 ㅠㅠ", likes: 2, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 6, boardId: "채식 자유", category: "전체", author: "초보비건", content: "완벽한 비건은 아니더라도 주 3일 채식 챌린지 시작합니다! 응원해주세요.", likes: 9, imgUrl: "", createdDate: "2026.05.11", comments: [] },


    { postId: 7, boardId: "주류매장", category: "서울/수도권", author: "전통주러버", content: "성수동 전통주 바 다녀왔는데 막걸리 샘플러 구성이 너무 트렌디하고 마음에 들어요.", likes: 19, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 8, boardId: "주류매장", category: "부산/경상", author: "ワ인조아", content: "광안리 바다 보면서 내추럴 와인 한잔하기 최고인 숨은 공간 공유합니다.", likes: 11, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 9, boardId: "주류매장", category: "전체", author: "혼술족", content: "증류식 소주 중에서 가성비 최고는 역시 소주인 것 같아요. 향이 좋습니다.", likes: 5, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 10, boardId: "주류 자유", category: "전체", author: "위스키독", content: "요즘 하이볼 기주로 산토리 말고 제임슨 쓰는 데 꽂혔는데 가성비 최고네요.", likes: 4, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 11, boardId: "주류 자유", category: "전체", author: "익명", content: "소믈리에 자격증 준비하시는 분 계시나요? 필기 팁 좀 공유 부탁드려요.", likes: 7, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 12, boardId: "주류 자유", category: "전체", author: "알콜요정", content: "콜키지 프리 매장 강남권에 갈만한 고깃집 리스트 업로드 예정입니다!", likes: 31, imgUrl: "", createdDate: "2026.05.10", comments: [] },


    { postId: 13, boardId: "이국맛집", category: "서울/수도권", author: "향신료중독", content: "동대문 네팔 음식점 다녀왔는데 커리랑 난 퀄리티 현지 수준입니다.", likes: 15, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 14, boardId: "이국맛집", category: "전체", author: "타코보이", content: "정통 멕시칸 타코는 고수 팍팍 넣고 라임 즙 짜서 먹어야 제맛이죠.", likes: 8, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 15, boardId: "이국맛집", category: "전체", author: "태국마스터", content: "똠얌꿍 제대로 시큼하고 칼칼하게 하는 숨은 맛집 알아냈어요.", likes: 13, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 16, boardId: "이국 자유", category: "전체", author: "마라러버", content: "마라탕 집 소스 황금 배합 레시피 알려드립니다. 땅콩소스 2숟갈에 고추기름 1스푼..", likes: 42, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 17, boardId: "이국 자유", category: "전체", author: "익명", content: "그리스 음식 기로스 집에서 또띠아로 비슷하게 흉내 내서 요리해봤는데 먹을만하네요.", likes: 6, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 18, boardId: "이국 자유", category: "전체", author: "미식여행가", content: "코코넛 밀크 들어간 부드러운 인도네시아식 커리 브랜드 추천받습니다.", likes: 3, imgUrl: "", createdDate: "2026.05.10", comments: [] },


    { postId: 19, boardId: "괴식맛집", category: "전체", author: "실험정신", content: "민트초코 짜장면 판다는 곳 제보받아서 다러왔습니다.. 첫맛은 민트인데 끝맛은 춘장이에요..", likes: 55, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 20, boardId: "괴식맛집", category: "전체", author: "도전자", content: "치킨에 몬스터 에너지 드링크 소스를 졸여서 만든 괴식 치킨.. 비주얼 파란색 충격적입니다.", likes: 34, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 21, boardId: "괴식맛집", category: "전체", author: "맵덕", content: "신길동 매운짬뽕 완뽕 도전 성공했습니다. 위장 보호제 무조건 드시고 가세요.", likes: 23, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 22, boardId: "괴식 자유", category: "전체", author: "익명", content: "바닐라 아이스크림에 참기름이랑 순후추 뿌려 먹으면 진짜 고급 디저트 맛 나는 거 아시나요?", likes: 88, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 23, boardId: "괴식 자유", category: "전체", author: "트렌드세터", content: "라면 끓일 때 마지막에 초콜릿 한 조각 넣으면 감칠맛 올라간다는 괴담 검증해 주실 분..", likes: 11, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 24, boardId: "괴식 자유", category: "전체", author: "미식이", content: "김치찌개에 치즈 케이크 한 조각 녹여 먹었는데 나름 고소하고 걸쭉하네요 추천합니다.", likes: 1, imgUrl: "", createdDate: "2026.05.09", comments: [] },

    { postId: 25, boardId: "유명셰프맛집", category: "전체", author: "한식러버", content: "ooo 명인님 낙지볶음 매장 투어 후기! 자극적이지 않고 재료 본연의 깔끔한 단맛이 최고.", likes: 29, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 26, boardId: "유명셰프맛집", category: "전체", author: "파스타마스터", content: "ooo 셰프님 쵸이닷 디너 다녀왔습니다. 분자요리 액체 질소 퍼포먼스 오감을 자극하네요.", likes: 41, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 27, boardId: "유명셰프맛집", category: "전체", author: "중식광팬", content: "ooo 셰프님 중식당 불도장 먹고 왔어요. 제대로 몸보신하고 대접받는 느낌이었습니다.", likes: 33, imgUrl: "", createdDate: "2026.05.10", comments: [] },
    { postId: 28, boardId: "유명셰프 자유", category: "전체", author: "익명", content: "ooo 대표님 유튜브 레시피 보고 감자짜글이 만들었는데 요리 똥손인데도 존맛탱 성공!", likes: 15, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 29, boardId: "유명셰프 자유", category: "전체", author: "유튜브독", content: "ooo 매장 키친마이야르 가보신 분 요즘 주말 웨이팅 얼마나 심한가요?", likes: 4, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 30, boardId: "유명셰프 자유", category: "전체", author: "셰프덕후", content: "ooo 버거 14만 원짜리 1966 버거 돈값 하는지 솔직히 품평해 주실 분 구합니다.", likes: 12, imgUrl: "", createdDate: "2026.05.11", comments: [] },


    { postId: 31, boardId: "미슐랭", category: "전체", author: "파인다이너", content: "미슐랭 3스타 가온 한식 코스요리 후기. 정갈함의 극치이며 도자기 식기마저 영롱함.", likes: 52, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 32, boardId: "미슐랭", category: "전체", author: "스시매니아", content: "미슐랭 1스타 스시야 옴카세 런치 타임 만족도 200%. 전어 스시가 기가 막혔습니다.", likes: 18, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 33, boardId: "미슐랭", category: "전체", author: "럭셔리", content: "프렌치 미슐랭 투스타 레스토랑 테이스팅 메뉴 가성비 나쁘지 않네요 페어링 추천.", likes: 24, imgUrl: "", createdDate: "2026.05.10", comments: [] },
    { postId: 34, boardId: "미슐랭 자유", category: "전체", author: "익명", content: "기념일 데이트용 미슐랭 1스타 가성비 런치 코스 라인업 짜봤는데 피드백 부탁해요.", likes: 8, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 35, boardId: "미슐랭 자유", category: "전체", author: "미식평론", content: "빕구르망 선정 기준이 요즘 트렌드 맛집 위주라 대중성에 더 가깝고 알짜배기인 듯 합니다.", likes: 16, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 36, boardId: "미슐랭 자유", category: "전체", author: "미식웨이팅", content: "미슐랭 가이드 서울 예약 성공 팁 공유 피치 매크로 없이 손가락 원클릭 광클 비법.", likes: 21, imgUrl: "", createdDate: "2026.05.11", comments: [] },


    { postId: 37, boardId: "키즈존", category: "전체", author: "육아맘123", content: "놀이방 시설이 역대급으로 깨끗한 대형 갈빗집 공유해요 유아식기도 풀세팅 되어있음.", likes: 14, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 38, boardId: "키즈존", category: "전체", author: "육아파파", content: "눈치 안 보고 애들이랑 파스타 먹을 수 있는 키즈 전용 패밀리 다이닝룸 다녀왔네요.", likes: 9, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 39, boardId: "키즈존", category: "전체", author: "도치맘", content: "아기 의자 5대 구비되어 있고 보틀 워머까지 완비된 교외 패밀리 대형 카페 리뷰.", likes: 11, imgUrl: "", createdDate: "2026.05.10", comments: [] },
    { postId: 40, boardId: "키즈존 자유", category: "전체", author: "익명", content: "요즘 노키즈존 많아져서 슬펐는데 웰컴키즈존 맵 앱으로 따로 만드시는 분 계시나요?", likes: 25, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 41, boardId: "키즈존 자유", category: "전체", author: "초둥맘", content: "초등학생 아이 입맛 취향 저격할 만한 수제버거 매장 서울권 정보 모아봅니다.", likes: 4, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 42, boardId: "키즈존 자유", category: "전체", author: "맘토크", content: "가족 외식할 때 아이패드 없이 식사 시간 평화롭게 유지하는 꿀팁 장난감 추천.", likes: 17, imgUrl: "", createdDate: "2026.05.11", comments: [] },


    { postId: 43, boardId: "동물식당", category: "서울/수도권", author: "댕댕이엄마", content: "연남동 애견동반 식당인데 전용 강아지 안심 스테이크 메뉴가 따로 있어서 감동 ㅠㅠ", likes: 33, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 44, boardId: "동물식당", category: "전체", author: "냥이집사", content: "고양이 전용 전용 캣타워 룸이 분리 설치된 테라스 애묘 동반 카페 리스트 공유.", likes: 16, imgUrl: "", createdDate: "2026.05.11", comments: [] },
    { postId: 45, boardId: "동물식당", category: "전체", author: "댕댕파파", content: "남양주에 애견 운동장 넓게 딸린 바베큐 식당 다녀왔는데 오프리쉬 가능해서 좋아요.", likes: 21, imgUrl: "", createdDate: "2026.05.10", comments: [] },
    { postId: 46, boardId: "동물식당 자유", category: "전체", author: "익명", content: "비반려인 분들과 공간 트러블 없이 펫티켓 지키며 외식할 때 챙겨야 할 필수 반려가방 매너.", likes: 45, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 47, boardId: "동물식당 자유", category: "전체", author: "푸들조아", content: "카페 테라스석 말고 실내 동반까지 완전 허용해 주는 브런치 카페 트렌드 모음.", likes: 12, imgUrl: "", createdDate: "2026.05.12", comments: [] },
    { postId: 48, boardId: "동물식당 자유", category: "전체", author: "펫패밀리", content: "동물 출입 가능 식당 갈 때 캔넬 훈련 필수 코스 노하우 팁 전수해 드립니다.", likes: 19, imgUrl: "", createdDate: "2026.05.11", comments: [] }
  ]);


  const [boardCategories, setBoardCategories] = useState<BoardCategory[]>([
    { wrapperId: "cate-veg-main", boardName: "채식맛집", categories: ["전체", "서울/수도권", "부산/경상", "제주/기타"], pendingCategories: [] },
    { wrapperId: "cate-veg-free", boardName: "채식 자유", categories: ["전체", "서울/수도권", "부산/경상"], pendingCategories: [] },
    { wrapperId: "cate-alc-main", boardName: "주류매장", categories: ["전체", "서울/수도권", "부산/경상"], pendingCategories: [] },
    { wrapperId: "cate-alc-free", boardName: "주류 자유", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-exp-main", boardName: "이국맛집", categories: ["전체", "서울/수도권"], pendingCategories: [] },
    { wrapperId: "cate-exp-free", boardName: "이국 자유", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-weird-main", boardName: "괴식맛집", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-weird-free", boardName: "괴식 자유", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-chef-main", boardName: "유명셰프맛집", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-chef-free", boardName: "유명셰프 자유", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-star-main", boardName: "미슐랭", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-star-free", boardName: "미슐랭 자유", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-kids-main", boardName: "키즈존", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-kids-free", boardName: "키즈존 자유", categories: ["전체"], pendingCategories: [] },
    { wrapperId: "cate-pet-main", boardName: "동물식당", categories: ["전체", "서울/수도권"], pendingCategories: [] },
    { wrapperId: "cate-pet-free", boardName: "동물식당 자유", categories: ["전체"], pendingCategories: [] }
  ]);


  const [currentActiveBoard, setCurrentActiveBoard] = useState<string>("채식맛집");
  const [currentActiveCategory, setCurrentActiveCategory] = useState<string>("전체");
  const [currentWrapperId, setCurrentWrapperId] = useState<string>("cate-veg-main");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;
  const nextPostId = useRef<number>(49);


  const [author, setAuthor] = useState<string>("미식가_A");
  const [quoteId, setQuoteId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");


  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});


  const handleSelectBoard = (boardName: string, wrapperId: string) => {
    setCurrentActiveBoard(boardName);
    setCurrentWrapperId(wrapperId);
    setCurrentActiveCategory("전체"); 
    setCurrentPage(1);
  };


  const handleSelectCategory = (boardName: string, categoryName: string, isPending: boolean) => {
    if (isPending) {
      alert("관리자의 승인을 기다리고 있는 카테고리입니다.");
      return;
    }
    setCurrentActiveBoard(boardName);
    setCurrentActiveCategory(categoryName);
    setCurrentPage(1);
  };


  const handleCreateNewCategory = () => {
    if (!newCategoryInput.trim()) {
      alert("신청할 카테고리명을 입력해 주세요!");
      return;
    }

    setBoardCategories(
      boardCategories.map((item) =>
        item.boardName === currentActiveBoard
          ? { ...item, pendingCategories: [...item.pendingCategories, newCategoryInput.trim()] }
          : item
      )
    );

    alert(`[${currentActiveBoard}]에 [# ${newCategoryInput.trim()}] 카테고리가 신청되었습니다.`);
    setNewCategoryInput("");
  };


  const handleSelectQuote = (postId: number) => {
    setQuoteId(String(postId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelQuote = () => {
    setQuoteId("");
  };


  const handleAddPost = () => {
    if (!content.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }

    const newPost: Post = {
      postId: nextPostId.current,
      boardId: currentActiveBoard,
      category: currentActiveCategory === "전체" ? "전체" : currentActiveCategory,
      author: isAnonymous ? "익명" : (author.trim() || "익명회원"),
      content: content,
      likes: 0,
      imgUrl: imgUrl.trim(),
      createdDate: new Date().toLocaleDateString(),
      comments: [],
      quotePostId: quoteId.trim() ? parseInt(quoteId.trim()) : null,
      isAnonymous: isAnonymous,
      isLocked: isLocked
    };

    setThreadsData([newPost, ...threadsData]);
    nextPostId.current += 1;
    setCurrentPage(1);


    setContent("");
    setImgUrl("");
    setQuoteId("");
  };


  const handleDeletePost = (postId: number) => {
    if (window.confirm("이 스레드를 삭제하시겠습니까?")) {
      setThreadsData(
        threadsData.map((post) =>
          post.postId === postId ? { ...post, deletedDate: new Date().toISOString() } : post
        )
      );
    }
  };


  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) {
      alert("댓글 내용을 입력해 주세요!");
      return;
    }

    const newComment = {
      commentId: Date.now(),
      author: isAnonymous ? "익명" : (author.trim() || "익명러"),
      text: commentText,
      createdDate: "현재"
    };

    setThreadsData(
      threadsData.map((post) =>
        post.postId === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      setThreadsData(
        threadsData.map((post) =>
          post.postId === postId
            ? { ...post, comments: post.comments.filter((c) => c.commentId !== commentId) }
            : post
        )
      );
    }
  };

  const handleToggleLike = (postId: number) => {
    setThreadsData(
      threadsData.map((post) => {
        if (post.postId === postId) {
          const isLiked = post.isLikedByUser;
          return {
            ...post,
            isLikedByUser: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

 
  const activePosts = threadsData.filter((post) => !post.deletedDate);
  const filteredPosts = activePosts.filter((post) => {
    const isBoardMatch = post.boardId === currentActiveBoard;
    const isCategoryMatch = currentActiveCategory === "전체" ? true : post.category === currentActiveCategory;
    return isBoardMatch && isCategoryMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
     <>

      <header className="cs-header">
        <div className="header-content">
          <h2 className="logo">
            <span>Eat Pick</span> 커뮤니티
          </h2>
          <div className="welcome-box">
            <h3>안녕하세요, Eat Pick 회원여러분!</h3>
            <h3>즐거운 시간되세요.</h3>
          </div>
        </div>
      </header>

    <div className="community-main-layout">

      <aside className="board-navigation-sidebar">
        <div className="sidebar-title">Eat Pick 커뮤니티</div>


        <div className="major-board-group">
          <div className="major-title">채식 게시판</div>
          <ul className="minor-board-list">
            <li
              className={`minor-item ${currentActiveBoard === "채식맛집" ? "active" : ""}`}
              onClick={() => handleSelectBoard("채식맛집", "cate-veg-main")}
            >
              방문후기
            </li>
            {currentWrapperId === "cate-veg-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "채식맛집")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("채식맛집", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
                {boardCategories.find(b => b.boardName === "채식맛집")?.pendingCategories.map((cate) => (
                  <span key={cate} className="category-chip pending" onClick={() => handleSelectCategory("채식맛집", cate, true)}>
                    # {cate} <span className="pending-badge">⌛ 대기</span>
                  </span>
                ))}
              </div>
            )}

            <li
              className={`minor-item ${currentActiveBoard === "채식 자유" ? "active" : ""}`}
              onClick={() => handleSelectBoard("채식 자유", "cate-veg-free")}
            >
              자유게시판
            </li>
            {currentWrapperId === "cate-veg-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "채식 자유")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("채식 자유", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
                {boardCategories.find(b => b.boardName === "채식 자유")?.pendingCategories.map((cate) => (
                  <span key={cate} className="category-chip pending" onClick={() => handleSelectCategory("채식 자유", cate, true)}>
                    # {cate} <span className="pending-badge">⌛ 대기</span>
                  </span>
                ))}
              </div>
            )}
          </ul>
        </div>


        <div className="major-board-group">
          <div className="major-title">주류 게시판</div>
          <ul className="minor-board-list">
            <li
              className={`minor-item ${currentActiveBoard === "주류매장" ? "active" : ""}`}
              onClick={() => handleSelectBoard("주류매장", "cate-alc-main")}
            >
              방문후기
            </li>
            {currentWrapperId === "cate-alc-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "주류매장")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("주류매장", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
                {boardCategories.find(b => b.boardName === "주류매장")?.pendingCategories.map((cate) => (
                  <span key={cate} className="category-chip pending" onClick={() => handleSelectCategory("주류매장", cate, true)}>
                    # {cate} <span className="pending-badge">⌛ 대기</span>
                  </span>
                ))}
              </div>
            )}

            <li
              className={`minor-item ${currentActiveBoard === "주류 자유" ? "active" : ""}`}
              onClick={() => handleSelectBoard("주류 자유", "cate-alc-free")}
            >
              자유게시판
            </li>
            {currentWrapperId === "cate-alc-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "주류 자유")?.categories.map((cate) => (
                  <span
                    key={cate}
                    className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`}
                    onClick={() => handleSelectCategory("주류 자유", cate, false)}
                  >
                    # {cate}
                  </span>
                ))}
              </div>
            )}
          </ul>
        </div>

        <div className="major-board-group">
          <div className="major-title">이국 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "이국맛집" ? "active" : ""}`} onClick={() => handleSelectBoard("이국맛집", "cate-exp-main")}>
              방문후기
            </li>
            {currentWrapperId === "cate-exp-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "이국맛집")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("이국맛집", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "이국 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("이국 자유", "cate-exp-free")}>
              자유게시판
            </li>
            {currentWrapperId === "cate-exp-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "이국 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("이국 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

   
        <div className="major-board-group">
          <div className="major-title">괴식 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "괴식맛집" ? "active" : ""}`} onClick={() => handleSelectBoard("괴식맛집", "cate-weird-main")}>방문후기</li>
            {currentWrapperId === "cate-weird-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "괴식맛집")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("괴식맛집", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "괴식 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("괴식 자유", "cate-weird-free")}>자유게시판</li>
            {currentWrapperId === "cate-weird-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "괴식 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("괴식 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

  
        <div className="major-board-group">
          <div className="major-title">유명셰프 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "유명셰프맛집" ? "active" : ""}`} onClick={() => handleSelectBoard("유명셰프맛집", "cate-chef-main")}>방문후기</li>
            {currentWrapperId === "cate-chef-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "유명셰프맛집")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("유명셰프맛집", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "유명셰프 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("유명셰프 자유", "cate-chef-free")}>자유게시판</li>
            {currentWrapperId === "cate-chef-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "유명셰ф 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("유명셰프 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

  
        <div className="major-board-group">
          <div className="major-title">미슐랭 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "미슐랭" ? "active" : ""}`} onClick={() => handleSelectBoard("미슐랭", "cate-star-main")}>방문후기</li>
            {currentWrapperId === "cate-star-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "미슐랭")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("미슐랭", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "미슐랭 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("미슐랭 자유", "cate-star-free")}>자유게시판</li>
            {currentWrapperId === "cate-star-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "미슐랭 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("미슐랭 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>

  
        <div className="major-board-group">
          <div className="major-title">키즈존 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "키즈존" ? "active" : ""}`} onClick={() => handleSelectBoard("키즈존", "cate-kids-main")}>방문후기</li>
            {currentWrapperId === "cate-kids-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "키즈존")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("키즈존", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "키즈존 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("키즈존 자유", "cate-kids-free")}>자유게시판</li>
            {currentWrapperId === "cate-kids-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "키즈존 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("키즈존 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>


        <div className="major-board-group">
          <div className="major-title">동물식당 게시판</div>
          <ul className="minor-board-list">
            <li className={`minor-item ${currentActiveBoard === "동물식당" ? "active" : ""}`} onClick={() => handleSelectBoard("동물식당", "cate-pet-main")}>방문후기</li>
            {currentWrapperId === "cate-pet-main" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "동물식당")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("동물식당", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
            <li className={`minor-item ${currentActiveBoard === "동물식당 자유" ? "active" : ""}`} onClick={() => handleSelectBoard("동물식당 자유", "cate-pet-free")}>자유게시판</li>
            {currentWrapperId === "cate-pet-free" && (
              <div className="category-chip-wrapper">
                {boardCategories.find(b => b.boardName === "동물식당 자유")?.categories.map((cate) => (
                  <span key={cate} className={`category-chip ${currentActiveCategory === cate ? "active" : ""}`} onClick={() => handleSelectCategory("동물식당 자유", cate, false)}># {cate}</span>
                ))}
              </div>
            )}
          </ul>
        </div>


        <div className="create-category-form">
          <div className="create-title">선택한 게시판에 카테고리 신청하기</div>
          <div className="target-board-indicator" id="targetIndicator">대상 게시판: {currentActiveBoard}</div>
          <div className="form-row">
            <input
              type="text"
              className="input-category-name"
              placeholder="카테고리명을 입력하세요."
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
            />
            <button type="button" className="add-category-btn" onClick={handleCreateNewCategory}>신청</button>
          </div>
        </div>
      </aside>


      <div className="threads-container">
        <div className="threads-header" id="feedHeaderTitle">
          {currentActiveBoard} ➔ {currentActiveCategory} 목록
        </div>

  
        <div className="write-card">
          <div className="write-layout">
            <div className="user-avatar" id="currentAvatar">U</div>
            <div className="write-inputs">
              <div className="author-row">
                <input
                  type="text"
                  className="input-author"
                  placeholder="작성자 이름"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                {quoteId && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <input
                      type="text"
                      className="input-author"
                      style={{ width: "80px", fontSize: "12px", textAlign: "center", backgroundColor: "#e9ecef;" }}
                      value={`ID: ${quoteId}`}
                      readOnly
                    />
                    <button type="button" className="cancel-quote-btn" onClick={handleCancelQuote}>❌ 취소</button>
                  </div>
                )}
              </div>
              <textarea
                className="input-text"
                placeholder="이야기를 함께 나누어보세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="write-options">
                <div className="option-left">
                  <label>
                    <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} /> 익명
                  </label>
                  <label>
                    <input type="checkbox" checked={isLocked} onChange={(e) => setIsLocked(e.target.checked)} /> 비밀글
                  </label>
                  <input
                    type="text"
                    className="input-img-url"
                    placeholder="이미지 URL 주소"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </div>
                <button className="submit-btn" onClick={handleAddPost}>등록</button>
              </div>
            </div>
          </div>
        </div>


        <div className="threads-feed" id="threadsFeed">
          {paginatedPosts.map((post) => {
            const avatarText = post.isAnonymous ? "익" : post.author.substring(0, 1).toUpperCase();
            const authorName = post.isAnonymous ? "익명 스레드" : post.author;


            let quotedBox = null;
            if (post.quotePostId) {
              const quotedPost = threadsData.find(p => p.postId === post.quotePostId);
              if (quotedPost) {
                quotedBox = (
                  <div className="quote-box">
                    <strong>@{quotedPost.isAnonymous ? "익명" : quotedPost.author}</strong> (ID: {quotedPost.postId}): {quotedPost.content.substring(0, 40)}...
                  </div>
                );
              }
            }

            return (
              <div className="thread-post" key={post.postId}>
                <div className="post-layout">
                  <div className="profile-column">
                    <div className="user-avatar" style={{ backgroundColor: post.isAnonymous ? "#555" : "#333" }}>{avatarText}</div>
                    <div className="profile-line"></div>
                  </div>
                  <div className="content-column">
                    <div className="post-header">
                      <div className="post-author">
                        {authorName}{" "}
                        <span style={{ fontSize: "11px", color: "var(--text-sub)", fontWeight: "normal" }}>#{post.postId}</span>{" "}
                        <span className="post-badge" style={{ background: "#222", color: "#ffd700" }}>{post.category}</span>
                        {post.isAnonymous && <span className="post-badge">익명</span>}
                        {post.isLocked && <span className="post-badge" style={{ background: "#5c4d00", color: "#ffd700" }}>비밀글</span>}
                      </div>
                      <div className="post-meta">
                        <span>{post.createdDate}</span>
                        <button className="delete-btn" onClick={() => handleDeletePost(post.postId)}>삭제</button>
                      </div>
                    </div>
                    <div className="post-body">
                      {post.isLocked ? "작성자와 관리자만 볼 수 있는 비밀 스레드입니다." : post.content}
                    </div>

                    {post.imgUrl && <div className="post-image"><img src={post.imgUrl} alt="첨부" /></div>}
                    {quotedBox}


                    <div className="post-actions">
                      <div className={`action-item ${post.isLikedByUser ? "liked" : ""}`} onClick={() => handleToggleLike(post.postId)}>
                        {post.isLikedByUser ? "❤️" : "🤍"} <span className="like-count">{post.likes}</span>
                      </div>
                      <div className="action-item">💬 <span className="comment-count">{post.comments.length}</span></div>
                      <div className="action-item" onClick={() => handleSelectQuote(post.postId)}>🔁 <span>인용하기</span></div>
                    </div>


                    <div className="comments-section">
                      <div className="comments-list">
                        {post.comments.map((comment) => (
                          <div className="comment-item" key={comment.commentId}>
                            <div className="comment-avatar">{comment.author.substring(0, 1).toUpperCase()}</div>
                            <div className="comment-content-box">
                              <div className="comment-header">
                                <span className="comment-author">{comment.author}</span>
                                <div className="post-meta">
                                  <span>{comment.createdDate}</span>
                                  <button className="delete-btn" style={{ fontSize: "10px" }} onClick={() => handleDeleteComment(post.postId, comment.commentId)}>삭제</button>
                                </div>
                              </div>
                              <div className="comment-text">{comment.text}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="comment-write-box">
                        <input
                          type="text"
                          className="comment-input"
                          placeholder="댓글작성"
                          value={commentInputs[post.postId] || ""}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.postId]: e.target.value })}
                          onKeyUp={(e) => { if (e.key === "Enter") handleAddComment(post.postId); }}
                        />
                        <button className="comment-submit-btn" onClick={() => handleAddComment(post.postId)}>등록</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {totalPages > 1 && (
          <div className="pagination-container">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>이전</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>다음</button>
          </div>
        )}
      </div>
  
    </div><br /><br /><br />
    </>
    
  );
}