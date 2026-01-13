
import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const Background = () => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "#050505", // Deep dark background
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 1,
                            color: "#d946ef", // Highlighting the grab links (Fuchsia-500 approx)
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: "#bd00ff", // Vibrant neon ghost purple
                },
                links: {
                    color: "#bd00ff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.bounce,
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 150,
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    options={options}
                    className="absolute inset-0 z-0"
                />
            )}
        </>
    );
}
export default Background;