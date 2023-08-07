import Balance from "../components/balance/Balance";
import Form from "../components/form/Form";
import Layout from "../components/layout/Layout";
import Transections from "../components/transection/Transections";

const Home = () => {
  return (
    <>
      <Layout>
        <Balance />
        <Form />
        <Transections />
      </Layout>
    </>
  );
};

export default Home;
