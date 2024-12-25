export const load = async() => {
  let data = `\n\n\nMAINPAGE.XAML
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="DoctorApp.MainPage">

    <ScrollView>
        <VerticalStackLayout
            Padding="30,0"
            Spacing="25">
            <Image
                Source="dotnet_bot.png"
                HeightRequest="185"
                Aspect="AspectFit"
                SemanticProperties.Description="dot net bot in a hovercraft number nine" />

            <Label
                Text="Hello, World!"
                Style="{StaticResource Headline}"
                SemanticProperties.HeadingLevel="Level1" />

            <Label
                Text="Welcome to &#10;.NET Multi-platform App UI"
                Style="{StaticResource SubHeadline}"
                SemanticProperties.HeadingLevel="Level2"
                SemanticProperties.Description="Welcome to dot net Multi platform App U I" />

            <Button
                x:Name="CounterBtn"
                Text="Click me" 
                SemanticProperties.Hint="Counts the number of times you click"
                Clicked="OnCounterClicked"
                HorizontalOptions="Fill" />
        </VerticalStackLayout>
    </ScrollView>

</ContentPage>

----------------------------------------------------------------------------

DoctorsPage.xaml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="DoctorApp.DoctorsPage"
             Title="Выберите врача">
    <StackLayout Padding="20">

        <Label Text="Список врачей"
               FontSize="20"
               HorizontalOptions="Center"
               Margin="0,10,0,20"/>

        <ListView x:Name="DoctorsListView"
                  ItemSelected="OnDoctorSelected"
                  BackgroundColor="#F0F0F0"
                  SeparatorColor="Gray">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <ViewCell>
                        <StackLayout Padding="10" Orientation="Horizontal">
                            <Label Text="{Binding Name}" FontSize="16" VerticalOptions="Center"/>
                            <Label Text="{Binding Specialty}" FontSize="14" VerticalOptions="Center" TextColor="Gray"/>
                        </StackLayout>
                    </ViewCell>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>
    </StackLayout>
</ContentPage>


----------------------------------------------------------------------------
DoctorsPage.xaml.cs
namespace DoctorApp;

public partial class DoctorsPage : ContentPage
{
    public List<Doctor> Doctors { get; set; }

    public DoctorsPage(Clinic clinic)
    {
        InitializeComponent();
        Doctors = new List<Doctor>
            {
                new Doctor { Id = 1, Name = "Иван Иванов", Specialty = "Терапевт" },
                new Doctor { Id = 2, Name = "Петр Петров", Specialty = "Хирург" },
                new Doctor { Id = 3, Name = "Мария Сидорова", Specialty = "Окулист" }
            };
        DoctorsListView.ItemsSource = Doctors;
    }

    private async void OnDoctorSelected(object sender, SelectedItemChangedEventArgs e)
    {
        if (e.SelectedItem is Doctor selectedDoctor)
        {
            await Navigation.PushAsync(new AppointmentPage(selectedDoctor));
        }
    }
}

public class Doctor
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Specialty { get; set; }
}

----------------------------------------------------------------------------
ClinicsPage.xaml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="DoctorApp.ClinicsPage"
             Title="Выберите поликлинику">
    <StackLayout Padding="20">
        <!-- Заголовок -->
        <Label Text="Список поликлиник"
               FontSize="20"
               HorizontalOptions="Center"
               Margin="0,10,0,20"/>

        <!-- Список поликлиник -->
        <ListView x:Name="ClinicsListView"
                  ItemSelected="OnClinicSelected"
                  BackgroundColor="#F0F0F0"
                  SeparatorColor="Gray">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <ViewCell>
                        <StackLayout Padding="10" Orientation="Horizontal">
                            <Label Text="{Binding Name}" FontSize="16" VerticalOptions="Center"/>
                        </StackLayout>
                    </ViewCell>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>
    </StackLayout>
</ContentPage>

----------------------------------------------------------------------------
ClinicsPage.xaml.cs
namespace DoctorApp;

public partial class ClinicsPage : ContentPage
{
    public List<Clinic> Clinics { get; set; }

    public ClinicsPage()
    {
        InitializeComponent();
        Clinics = new List<Clinic>
        {
            new Clinic { Id = 1, Name = "Поликлиника №1" },
            new Clinic { Id = 2, Name = "Поликлиника №2" },
            new Clinic { Id = 2, Name = "Поликлиника №3" },
            new Clinic { Id = 2, Name = "Поликлиника №4" },
        };
        ClinicsListView.ItemsSource = Clinics;
    }

    private async void OnClinicSelected(object sender, SelectedItemChangedEventArgs e)
    {
        if (e.SelectedItem is Clinic selectedClinic)
        {
            await Navigation.PushAsync(new DoctorsPage(selectedClinic));
        }
    }
}

public class Clinic
{
    public int Id { get; set; }
    public string Name { get; set; }
}

----------------------------------------------------------------------------
APPSHELL.XAML
<Shell xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
       xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
       xmlns:local="clr-namespace:DoctorApp"
       x:Class="DoctorApp.AppShell"
       Title="Запись к врачу">

    <ShellContent
        Title="Поликлиники"
        ContentTemplate="{DataTemplate local:ClinicsPage}"
        Route="ClinicsPage" />

    <ShellContent
        Title="Врачи"
        ContentTemplate="{DataTemplate local:DoctorsPage}"
        Route="DoctorsPage" />

    <ShellContent
        Title="Запись на прием"
        ContentTemplate="{DataTemplate local:AppointmentPage}"
        Route="AppointmentPage" />

</Shell>

----------------------------------------------------------------------------
APPSHELL.XAML.CS
using Microsoft.Maui;
using Microsoft.Maui.Controls;

namespace DoctorApp
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();

            Routing.RegisterRoute("ClinicsPage", typeof(ClinicsPage));
            Routing.RegisterRoute("DoctorsPage", typeof(DoctorsPage));
            Routing.RegisterRoute("AppointmentPage", typeof(AppointmentPage));
        }
    }
}
\n\n\n\n\n\n\n\n\n`
return {data};
}