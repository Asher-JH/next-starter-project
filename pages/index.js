import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.data} />
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:12345@next-app-project.0q65j.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetups = await db.collection("meetups").find().toArray();
  client.close();

  return {
    props: {
      data: meetups.map(({ _id, ...otherFields }) => ({
        ...otherFields,
        id: _id.toString(),
      })),
    },
    // Depends on data update frequency
    revalidate: 10,
  };
};

export default HomePage;
