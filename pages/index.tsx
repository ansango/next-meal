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
                  Busca un nuevo destino <br className="hidden lg:block" />
                  que planificar y disfrutar
                </h1>
                <Form
                  onSubmit={() => console.log("")}
                  className="py-5 sm:max-w-lg mx-auto grid sm:grid-cols-12 gap-5"
                >
                  <FormInput
                    name="a"
                    label="Introduce tu destino"
                    size="lg"
                    containerProps={{
                      className: "col-span-full w-full sm:col-span-8",
                    }}
                  />
                  <Button
                    className="col-span-full sm:col-span-4 normal-case text-sm"
                    variant="gradient"
                    type="submit"
                  >
                    Buscar
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Home;
