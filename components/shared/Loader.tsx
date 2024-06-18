export const Loader = () => {
	return (
		<div className="w-full h-[calc(100vh-70px)] bg-white absolute top-0 right-1 opacity-90 backdrop-filter backdrop-blur-lg flex items-center justify-center flex-col">
			<p className="text-primary font-medium text-[22px] ">
				Generating your pitch script...
			</p>
			<p className="text-primary font-medium text-[22px] ">
				This may take a few seconds.
			</p>
		</div>
	);
};
