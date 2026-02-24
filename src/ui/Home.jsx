import { useSelector } from 'react-redux';
////////////////////////////////////////////
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
///////////////////////////////////////////////////////
function Home() {
  const { username } = useSelector((store) => store.user);
  return (
    <div className="my-10 px-6 text-center font-semibold sm:my-16">
      <h1 className="mb-8 text-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="font-normal text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
