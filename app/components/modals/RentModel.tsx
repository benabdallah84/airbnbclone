'use client'
import useRentModal from '@/app/hooks/useRentModal';
import Modal from './modal';
import { useMemo, useState } from 'react'
import Heading from '../heading';
import { categories } from '../navbar/categories'
import CategoryInput from '../inputs/categoryInput';
import CountrySelect from '../inputs/countrySelect';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import dynamic from 'next/dynamic';
import Counter from '../inputs/counter';
import ImageUplaod from '../inputs/imageUplaod';
import Input from '../inputs/input';
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { toast } from 'react-hot-toast';

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES =3,
    DESCRIPTION =4,
    PRICE =5
}

const RentModel = () => {
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading]= useState(false)
    const rentModal = useRentModal()

    const router = useRouter()
    const {
        register, handleSubmit, formState: { errors }, watch,reset, setValue
    } = useForm<FieldValues>({
        defaultValues:{
            category:'',
            location:'',
            guestCount:0,
            roomCount:0,
            bathroomCount:0,
            imageSrc:'',
            price:'',
            description:'',
            title:''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const gestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(()=> import('../map'), {ssr: false}),[location])

    const setCustomValue = (id:string, value:any) => {
        setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        if(step !== STEPS.PRICE){
           return onNext()
        }
        setIsLoading(true)
        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Listing created successfully')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        })
        .catch(()=>{
            toast.error("Something went wrong!")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    },[step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
            title='Which of these best descripes your place?'
            subtitle='pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3
             max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={(category)=>setCustomValue('category',category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
        
    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Where is your place located?'
                    subtitle='Help guest find you!'
                />
                <CountrySelect
                    value={location}
                    onChange={(value)=>setCustomValue('location',value)}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }   

    if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title="Share some basics about your place"
                subtitle="What amenities do you have?"
                />
                <Counter
                title="Guests"
                subtitle="How many guests do you allow?"
                value={gestCount}
                onChange={(value)=>setCustomValue('guestCount',value)}
                />
                <hr/>
                <Counter
                title="Rooms"
                subtitle="How many rooms do you allow?"
                value={roomCount}
                onChange={(value)=>setCustomValue('roomCount',value)}
                />
                <hr/>
                <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you allow?"
                value={bathroomCount}
                onChange={(value)=>setCustomValue('bathroomCount',value)}
                />
            </div>
        )

    }

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like"
                />
                <ImageUplaod
                value={imageSrc}
                onChange={(value)=>setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr/>
                <Input
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                
            </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Now, Set your price"
                    subtitle="How much do you charge per night? "
                />
                <Input
                id="price"
                label="Price"
                formatPrice
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="number"
                />
                
                
            </div>
        )
    }
    return(
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Airbnb your home"
        body={bodyContent}
        />
    )
}
export default RentModel