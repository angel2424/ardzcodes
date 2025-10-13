import { useEffect } from "react"

export default function PortraitFlip() {
	useEffect(() => {
		if (typeof window === "undefined") return
		;(async () => {
			const { default: gsap } = await import("gsap")
			const { ScrollTrigger } = await import("gsap/ScrollTrigger")
			gsap.registerPlugin(ScrollTrigger)

			const card = document.getElementById("portraitCard")
			const container = document.getElementById("flip-scroll-container")
			const scrollHeight = container.clientHeight
			const section1 = document.querySelector(".section-1")
			const section2 = document.querySelector(".section-2")
			const section3 = document.querySelector(".section-3")
			if (!card || !container) return

			const tl = gsap.timeline({})

			gsap.set(card, {
				rotateY: 0,
				rotateZ: 0,
				rotateX: 0,
				height: "480px",
				width: "380px",
			})

			// Animation for section 2
			tl.to(card, {
				rotateY: 160,
				rotateZ: 8,
				rotateX: -18,
				x: "75%",
				y: `${section1.clientHeight + section1.clientHeight / 4}px`,
				height: "370px",
				width: "330px",
				scrollTrigger: {
					trigger: section2,
					start: "top bottom",
					end: "center center",
					scrub: true,
				},
			})

			// Animation for section 3
			tl.to(card, {
				rotateY: 350,
				rotateZ: 10,
				rotateX: 10,
				y: `${
					section1.clientHeight +
					section2.clientHeight +
					section1.clientHeight / 4
				}px`,
				x: "70%",
				scrollTrigger: {
					trigger: section3,
					start: "top bottom",
					end: "center center",
					scrub: true,
				},
			})
		})()
	}, [])

	return (
		<div className="[perspective:1200px]">
			<div
				id="portraitCard"
				className={`fixed w-[380px] h-[480px]
					   [transform-style:preserve-3d] [transition:transform_0.8s_ease] left-1/2 top-[50%] transform-[translate(-58%,35%)]`}
			>
				{/* Front */}
				<div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden">
					<img
						src="/portrait.png"
						alt="Portrait of Angel Rodriguez"
						className="w-full h-full object-cover rounded-3xl shadow-xl"
					/>
				</div>

				{/* Back */}
				<div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden">
					<img
						src="/card-back.jpg"
						alt="Card back"
						className="w-full h-full object-cover rounded-3xl shadow-xl"
					/>
				</div>
			</div>
		</div>
	)
}
