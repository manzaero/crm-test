import {Header} from "@/widgets/header/index.js";
import {Footer} from "@/widgets/footer/index.ts";

export default function App() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

            <Header />

            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl w-full px-4 py-12 text-center text-lg">
                    <p>Bello!</p>
                </div>
            </main>

            <Footer/>

        </div>
    );
}