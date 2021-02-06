import { Selector } from 'testcafe';

// prettier-ignore
fixture `Working...`
    .page `https://secure.axainsurance.com/Sales/PersonalLines/AxaDirect/Axa/Travel/Standard/Desktop/Quote/Entry`
    // UNCOMMENT LINES BELOW IF YOU FEEL DIZZY LOOKING AT THE TEST PREVIEWS:
    // TestCafe hook to slow down each test, so that you can observe what's going on. Don't use it in production environment.
    // .beforeEach(async t => {
    //     await t.setTestSpeed(0.5);
    // })
// prettier-ignore
test('Testing Axa Travel', async t => {
    // Navigating the DOM tree in search of target elements...
    // first_page
    const single_trip_button = Selector('#select-single-trip');
    const today_option = Selector('#departureDate > div > div > div > div > button');
    const three_nights = Selector('#returnDate > div > div > div > div > button');
    const one_country = Selector('#select-one-country');
    const first_displayed_country = Selector('#defaultCountries > div > div > div > div > button.select-country');
    const no_multiple_trips = Selector('#AreMultipleTripsPlanned_0');

    // traveller details
    const travellers_title_mr = Selector('#Travellers_Traveller1ViewModel_Traveller1TitleId_1');
    const travellers_first_name = Selector('#Travellers_Traveller1ViewModel_Traveller1FirstName');
    const travellers_last_name = Selector('#Travellers_Traveller1ViewModel_Traveller1LastName');
    const travellers_DOB_day = Selector('#Traveller1_DateOfBirthDay');
    const travellers_DOB_month = Selector('#Traveller1_DateOfBirthMonth');
    const travellers_DOB_year = Selector('#Traveller1_DateOfBirthYear');
    const travellers_email = Selector('#Travellers_EmailAddress');
    const house_num_name = Selector('#HouseNumberOrName');
    const postcode = Selector('#Postcode');

    // pop up the manual address input iframe or automatically find address
    const findAddress = Selector('#find-address-button > a');


    // medical section
    const not_awaiting_medical_diag = Selector('#IsAwaitingMedicalDiagnosis_0');
    const no_longtime_prescribed_medications = Selector('#HasTravellerBeenPrescribedMedicalTreatmentEver_0');
    const no_shorttime_prescribed_medications = Selector('#HasTravellerBeenPrescribedMedicalTreatmentLastYear_0');
    const submit_first_page = Selector('#submit-travel-details');


    // 2nd page - quote details
    const smartTravelOption = Selector('#select-travel-smart');
    const noCruiseCover = Selector('#no-cruise-cover');
    const noWinterSports = Selector('#no-winter-sports');
    const noSports = Selector('#no-sports-activities');
    const noGolfCover = Selector('#no-golf-cover');
    const submit_second_page = Selector('#submit-your-details');

    //  --- TESTING CODE BEGINS ----

    // test first page
    await t
          .click(single_trip_button)
          .click(today_option);
    await t.expect(today_option.child('span').innerText).eql('Today');
    await t.click(three_nights);
    await t.expect(three_nights.child('span').innerText).eql('(3 Nights)');
    await t.click(one_country);
    await t.click(first_displayed_country);
    await t.click(no_multiple_trips);

    await t
        .click(travellers_title_mr)
        .typeText(travellers_first_name, 'Jan')
        .typeText(travellers_last_name, 'Nowak')
        .typeText(travellers_DOB_day, '01')
        .typeText(travellers_DOB_month, '01')
        .typeText(travellers_DOB_year, '1985')
        .typeText(travellers_email, 'mail@test.pl')
        .typeText(house_num_name, '66')
        .typeText(postcode, 'KT111HY');
    await t.click(findAddress);

    await t.click(not_awaiting_medical_diag)
           .click(no_longtime_prescribed_medications)
           .click(no_shorttime_prescribed_medications)
           .click(submit_first_page);

    // test second page
    await t
        .click(smartTravelOption)
        .click(noCruiseCover)
        .click(noWinterSports)
        .click(noSports)
        .click(noGolfCover)
        .click(submit_second_page);

    //test third page

    // <--- Extractring the value, parsing to a numeric value & comparing whether it's lower than the specified threshold. --->
    const priceSelector = await Selector('div.quote-price-total > p').innerText;
    await t.expect(parseFloat(priceSelector.slice(1,))).lt(1000, 'total quote price is less than 1000.');
});
