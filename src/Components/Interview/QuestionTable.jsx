export default function QuestionTable({ question, idx }) {
  return (
    <>
      <tr>
        <td>{question}</td>
        <td>수정</td>
        <td>삭제</td>
      </tr>
    </>
  );
}
