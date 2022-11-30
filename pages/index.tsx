import { Container, Form, FormInput, Button } from "components/common";

const Home = () => {
  return (
    <Container>
      <section className="w-full bg-white dark:bg-wickeddark">
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
          <div className="flex w-full mx-auto text-left">
            <div className="relative inline-flex items-center mx-auto align-middle">
              <div className="pb-12 text-center">
                <h1 className="max-w-5xl text-3xl font-bold leading-none tracking-tight text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                  Crea nuevos planes de alimentación, <br className="hidden lg:block" />
                  personaliza ingredientes, recetas y más.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Home;
