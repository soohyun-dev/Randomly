import { db } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";

// 'posts' 컬렉션의 모든 문서들을 가져옴
const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
  // 가져온 모든 문서들을 확인
  console.log(doc.id, " => ", doc.data());
});
