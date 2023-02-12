import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import useProfileRequests from "../../hooks/useProfileRequests";
import ProfileForm from "./ProfileForm";

function CreateOrEditProfile({ edit }) {
  const { createOrEditProfile, loadProfile } = useProfileRequests();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const submitProfile = async (formData, edit) => {
    createOrEditProfile(formData, edit).then((data) => {
      if (data) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container>
      <ProfileForm onSubmit={submitProfile} edit={edit} />
    </Container>
  );
}

export default CreateOrEditProfile;
