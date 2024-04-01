import ChapterSection from "../common/ChapterSection";
import CustomCounter from "./effects/CustomCounter";
import StaggeringDotsApp from "./effects/StaggeringDotsApp";

export default function CustomHooks(): React.JSX.Element {
    return (
        <ChapterSection header="Reusing Logic with Custom Hooks">
            <StaggeringDotsApp />
            <CustomCounter />
        </ChapterSection>
    );
}
