import BookTable from "../components/BookTable";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="p-4">
      <Header className={"flex justify-between items-center text-sky-800"} />
      <BookTable />
    </div>
  );
};

export default Home;
