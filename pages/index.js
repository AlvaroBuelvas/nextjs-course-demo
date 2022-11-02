import Head from "next/head";

import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tour_eiffel_at_sunrise_from_the_trocadero.jpg/413px-Tour_eiffel_at_sunrise_from_the_trocadero.jpg",
    address: "Some address 5, 12345 fake street",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tour_eiffel_at_sunrise_from_the_trocadero.jpg/413px-Tour_eiffel_at_sunrise_from_the_trocadero.jpg",
    address: "Some address 10, 12345 fake street",
    description: "This is a second meetup!",
  },
];

function Homepage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
} */

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://abuelvas:WCMDnDhyf8BdxFjx@cluster0.yrdy19o.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default Homepage;
