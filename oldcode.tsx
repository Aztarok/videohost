// useEffect(() => {
//     const unsubHydrage = useStore.persist.onHydrate(() =>
//         setIsHydrated(true)
//     );
//     if (useStore.persist.hasHydrated()) setIsHydrated(true);
//     return () => unsubHydrage();
// }, []);

// useEffect(() => {
//     console.log("lol");
//     if (!isHydrated || logoutInProgress) {
//         if (isSignedIn) {
//             console.log("4");
//         } else {
//             return;
//         }
//     }
//     console.log("1");
//     if (user) {
//         setIsSignedIn(true);
//         return;
//     }

//     console.log("2");
//     if (isSignedIn === user) {
//         console.log("not signed in", isSignedIn);
//         return;
//     }
//     console.log("3");

//     console.log("Fetching user from Supabase...");
//     const fetchUser = async () => {
//         try {
//             const supabase = createClient();
//             const { data: session } = await supabase.auth.getSession();
//             // if (!session.session) {
//             //     setUser(null);
//             //     setIsSignedIn(false);
//             // } else {
//             const { data } = await supabase.auth.getUser();
//             const { data: profileData } = await supabase
//                 .from("profiles")
//                 .select("*")
//                 .eq("id", data.user?.id)
//                 .single();
//             console.log(profileData);
//             if (profileData) {
//                 const transformeduser = {
//                     id: profileData.id,
//                     createdAt: new Date(profileData.created_at),
//                     userName: profileData.user_name,
//                     email: profileData.email,
//                     imageUrl: profileData.image_url,
//                     isActive: profileData.is_active
//                 };
//                 console.log(transformeduser);
//                 setUser(transformeduser);
//                 // }
//             }
//         } catch (error) {
//             console.error("Error fetching user from Supabase: ", error);
//         }
//     };

//     fetchUser();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [isHydrated, logoutInProgress, isSignedIn]);

// console.log("server signed in", serverSignedIn);
// console.log("hydrated", isHydrated);
// console.log("signed in", isSignedIn);

// console.log("hi");
